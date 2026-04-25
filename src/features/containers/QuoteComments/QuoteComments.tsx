import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { useParams } from 'react-router-dom';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { getCommentsAsync, selectLatestComments, selectSecondRequestStatus, updateQuoteComment } from './redux/quoteCommentsSlice';
import { clearAddedComment, postCommentAsync, selectAddedComment } from './redux/postCommentSlice';
import { getQuotePostAsync, selectQuotePost } from './redux/getQuotePostSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/redux/getUserSlice';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const QuoteComments: React.FC = () => {
	const { quoteId } = useParams<{ quoteId: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const [comment, setComment] = useState<string>('');

	const latestComments = useSelector(selectLatestComments) as any[];
	const getAddedComment = useSelector(selectAddedComment) as any;
	const quotePost = useSelector(selectQuotePost) as any;
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const isEmpty = (obj: any) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		dispatch((getQuotePostAsync as any)({ url: `${url}/getQuotePost`, quoteId }));
	}, [dispatch, quoteId]);

	useEffect(() => {
		dispatch((getUserAsync as any)(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus1 === 'fulfilled') {
			dispatch((getCommentsAsync as any)({ url: `${url}/getComments`, quoteId }));
		}
	}, [dispatch, requestStatus1, quoteId]);

	useEffect(() => {
		if (!isEmpty(getAddedComment)) {
			let updatedComments = [...latestComments];
			updatedComments.unshift(getAddedComment);
			dispatch(clearAddedComment());
			dispatch(updateQuoteComment(updatedComments));
		}
	}, [dispatch, getAddedComment, latestComments]);

	const postComment = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (quotePost.id && comment !== '') {
			dispatch((postCommentAsync as any)({ url: `${url}/addComment`, quoteId, comment }));
			(event.target as HTMLFormElement).reset();
			setComment('');
		}
	};

	const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setComment(value);
	};

	return (
		<>
			{requestStatus1 === 'pending' ? (
				<Loading />
			) : requestStatus1 === 'fulfilled' ? (
				requestStatus2 === 'pending' ? (
					<Loading />
				) : requestStatus2 === 'fulfilled' ? (
					<section className='mt6 mh2 f7'>
						{quotePost.id && (
							<QuotePost
								quoteId={quotePost.id}
								username={quotePost.user_name}
								title={quotePost.title}
								quote={`${quotePost.quote}`}
								likeCount={quotePost.likeCount}
								didLike={quotePost.didLike}
								date={quotePost.date_posted}
								hasComments={false}
							/>
						)}
						<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
						<div className='mt5'>
							{latestComments.map((commentData) => {
								return <QuoteComment key={commentData.id} comment={commentData.comment} commenter={commentData.commenter} date={commentData.date_posted} />;
							})}
						</div>
					</section>
				) : (
					<PleaseSignin />
				)
			) : (
				<PleaseSignin />
			)}
		</>
	);
};

export default QuoteComments;
