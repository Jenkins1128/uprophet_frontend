"use client";
import React from 'react';
import Loading from '@/components/ui/Loading/Loading';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import { useParams } from 'next/navigation';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchQuotePost, fetchComments, postCommentRequest } from '@/api/quotes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCommentSchema, type AddCommentFormData } from '@/validation/quotes';
import type { Comment } from '@/types';

const QuoteComments: React.FC = () => {
	const { quoteId } = useParams<{ quoteId: string }>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<AddCommentFormData>({
		resolver: zodResolver(addCommentSchema),
		defaultValues: {
			comment: ''
		}
	});

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
			reset();
			queryClient.setQueryData(['comments', quoteId], (oldData: Comment[] | undefined) => {
				if (!oldData) return [newComment];
				return [newComment, ...oldData];
			});
		},
	});

	const onSubmit: SubmitHandler<AddCommentFormData> = (data) => {
		if (quoteId) {
			createComment({ quoteId: quoteId as string, comment: data.comment });
		}
	};

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isQuoteLoading || isCommentsLoading) return <Loading />;

	return (
		<section className='pt-24 pb-8 px-2'>
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
			<CommentPoster
				register={register}
				errors={errors}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				isSubmitting={isSubmitting}
			/>
			<div className='mt-4'>
				{latestComments.map((commentData: Comment) => {
					return <QuoteComment key={commentData.id} comment={commentData.comment} commenter={commentData.commenter} date={commentData.datePosted} />;
				})}
			</div>
		</section>
	);
};

export default QuoteComments;

