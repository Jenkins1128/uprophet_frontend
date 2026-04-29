"use client";
import React, { useState, useRef } from 'react';
import Like from '@/images/like.png';
import UnLike from '@/images/unlike.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeQuoteRequest, unlikeQuoteRequest } from '@/api/quotes';
import type { Quote } from '@/types';

interface LikeButtonProps {
	quoteId: string | number;
	likeCount: number;
	didLike: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ quoteId, likeCount, didLike }) => {
	const getLikeCount = useRef<number>(likeCount);
	const [getDidLike, setDidLike] = useState<boolean>(didLike);
	const queryClient = useQueryClient();

	const updateCache = (liked: boolean) => {
		const updateQuote = (oldData: Quote | Quote[] | undefined): Quote | Quote[] | undefined => {
			if (!oldData) return oldData;

			// If it's an array (like exploreQuotes, latestQuotes, profileQuotes)
			if (Array.isArray(oldData)) {
				return oldData.map((q) =>
					q.id === quoteId
						? { ...q, didLike: liked, likeCount: q.likeCount + (liked ? 1 : -1) }
						: q
				);
			}

			// If it's a single object (like quotePost)
			if (oldData.id === quoteId) {
				return { ...oldData, didLike: liked, likeCount: oldData.likeCount + (liked ? 1 : -1) };
			}

			return oldData;
		};

		queryClient.setQueriesData({ queryKey: ['exploreQuotes'] }, updateQuote);
		queryClient.setQueriesData({ queryKey: ['latestQuotes'] }, updateQuote);
		queryClient.setQueriesData({ queryKey: ['profileQuotes'] }, updateQuote);
		queryClient.setQueriesData({ queryKey: ['quotePost', quoteId] }, updateQuote);
	};

	const { mutate: performLike } = useMutation({
		mutationFn: likeQuoteRequest,
		onSuccess: () => {
			getLikeCount.current += 1;
			setDidLike(true);
			updateCache(true);
		}
	});

	const { mutate: performUnlike } = useMutation({
		mutationFn: unlikeQuoteRequest,
		onSuccess: () => {
			getLikeCount.current -= 1;
			setDidLike(false);
			updateCache(false);
		}
	});

	const like = () => {
		performLike(quoteId);
	};

	const unlike = () => {
		performUnlike(quoteId);
	};

	return (
		<div className='flex items-center pv1'>
			<p className='f6 f5-ns moon-gray b'>{getLikeCount.current ? getLikeCount.current : 0}</p>
			{getDidLike ? (
				<button className='grow pointer b--none bg-transparent ph2' onClick={unlike}>
					<img className='h1 w1 h2-ns w2-ns v-mid' alt='unlike' src={Like.src || Like} />
				</button>
			) : (
				<button className='grow pointer b--none bg-transparent ph2' onClick={like}>
					<img className='h1 w1 h2-ns w2-ns v-mid' alt='like' src={UnLike.src || UnLike} />
				</button>
			)}
		</div>
	);
};

export default LikeButton;
