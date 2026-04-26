"use client";
import React, { useState, useRef } from 'react';
import Like from '../../../images/like.png';
import UnLike from '../../../images/unlike.png';
import { url } from '../../../domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface LikeButtonProps {
	quoteId: string | number;
	likeCount: number;
	didLike: boolean;
}

const likeData = async (quoteId: string | number) => {
	const { data } = await axios.post(`${url}/like`, { quoteId }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const unlikeData = async (quoteId: string | number) => {
	const { data } = await axios.post(`${url}/unlike`, { quoteId }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const LikeButton: React.FC<LikeButtonProps> = ({ quoteId, likeCount, didLike }) => {
	const getLikeCount = useRef<number>(likeCount);
	const [getDidLike, setDidLike] = useState<boolean>(didLike);
	const queryClient = useQueryClient();

	const { mutate: performLike } = useMutation({
		mutationFn: likeData,
		onSuccess: () => {
			getLikeCount.current += 1;
			setDidLike(true);
			queryClient.invalidateQueries({ queryKey: ['exploreQuotes'] });
			queryClient.invalidateQueries({ queryKey: ['homeQuotes'] });
		}
	});

	const { mutate: performUnlike } = useMutation({
		mutationFn: unlikeData,
		onSuccess: () => {
			getLikeCount.current -= 1;
			setDidLike(false);
			queryClient.invalidateQueries({ queryKey: ['exploreQuotes'] });
			queryClient.invalidateQueries({ queryKey: ['homeQuotes'] });
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
