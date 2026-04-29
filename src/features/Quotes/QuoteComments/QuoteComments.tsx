"use client";
import React, { useState } from 'react';
import Loading from '@/components/ui/Loading/Loading';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import { useParams } from 'next/navigation';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchQuotePost, fetchComments, postCommentRequest } from '@/api/quotes';
import type { Comment } from '@/types';

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
		mutationFn: postCommentRequest,
		onSuccess: (newComment: Comment) => {
			queryClient.setQueryData(['comments', quoteId], (oldData: Comment[] | undefined) => {
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
					username={quotePost.userName}
					title={quotePost.title}
					quote={`${quotePost.quote}`}
					likeCount={quotePost.likeCount}
					didLike={quotePost.didLike}
					date={quotePost.datePosted}
					hasComments={false}
					canDelete={false}
					deleteQuote={() => {}}
				/>
			)}
			<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
			<div className='mt5'>
				{latestComments.map((commentData: Comment) => {
					return <QuoteComment key={commentData.id} comment={commentData.comment} commenter={commentData.commenter} date={commentData.datePosted} />;
				})}
			</div>
		</section>
	);
};

export default QuoteComments;
