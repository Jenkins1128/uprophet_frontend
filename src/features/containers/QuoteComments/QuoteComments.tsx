"use client";
import React, { useState } from 'react';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { useParams } from 'next/navigation';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { url } from '../../../domain';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchQuotePost = async (quoteId: string) => {
	const { data } = await axios.post(`${url}/getQuotePost`, { quoteId }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const fetchComments = async (quoteId: string) => {
	const { data } = await axios.post(`${url}/getComments`, { quoteId }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const postCommentData = async ({ quoteId, comment }: { quoteId: string; comment: string }) => {
	const { data } = await axios.post(`${url}/addComment`, { quoteId, comment }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const QuoteComments: React.FC = () => {
	const { quoteId } = useParams<{ quoteId: string }>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();
	const [commentText, setCommentText] = useState<string>('');

	const { data: quotePost, isLoading: isQuoteLoading } = useQuery({
		queryKey: ['quotePost', quoteId],
		queryFn: () => fetchQuotePost(quoteId as string),
		enabled: isUserSuccess && !!quoteId,
	});

	const { data: latestComments = [], isLoading: isCommentsLoading } = useQuery({
		queryKey: ['comments', quoteId],
		queryFn: () => fetchComments(quoteId as string),
		enabled: isUserSuccess && !!quoteId,
	});

	const { mutate: createComment } = useMutation({
		mutationFn: postCommentData,
		onSuccess: (newComment) => {
			queryClient.setQueryData(['comments', quoteId], (oldData: any[]) => {
				if (!oldData) return [newComment];
				return [newComment, ...oldData];
			});
		},
	});

	const postComment = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (quotePost?.id && commentText !== '') {
			createComment({ quoteId: quoteId as string, comment: commentText });
			(event.target as HTMLFormElement).reset();
			setCommentText('');
		}
	};

	const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCommentText(event.target.value);
	};

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isQuoteLoading || isCommentsLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			{quotePost?.id && (
				<QuotePost
					quoteId={quotePost.id}
					username={quotePost.user_name}
					title={quotePost.title}
					quote={`${quotePost.quote}`}
					likeCount={quotePost.likeCount}
					didLike={quotePost.didLike}
					date={quotePost.date_posted}
					hasComments={false}
					canDelete={false}
					deleteQuote={() => {}}
				/>
			)}
			<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
			<div className='mt5'>
				{latestComments.map((commentData: any) => {
					return <QuoteComment key={commentData.id} comment={commentData.comment} commenter={commentData.commenter} date={commentData.date_posted} />;
				})}
			</div>
		</section>
	);
};

export default QuoteComments;
