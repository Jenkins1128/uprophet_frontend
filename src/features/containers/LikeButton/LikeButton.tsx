import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Like from '../../../images/like.png';
import { likeAsync, unlikeAsync } from './redux/likeButtonThunk';
import UnLike from '../../../images/unlike.png';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

interface LikeButtonProps {
	quoteId: string | number;
	likeCount: number;
	didLike: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ quoteId, likeCount, didLike }) => {
	const dispatch = useDispatch<AppDispatch>();

	const getLikeCount = useRef<number>(likeCount);
	const [getDidLike, setDidLike] = useState<boolean>(didLike);

	const like = () => {
		dispatch((likeAsync as any)({ url: `${url}/like`, quoteId })).then((res: any) => {
			if (res.meta.requestStatus === 'fulfilled') {
				getLikeCount.current += 1;
				setDidLike(true);
			}
		});
	};

	const unlike = () => {
		dispatch((unlikeAsync as any)({ url: `${url}/unlike`, quoteId })).then((res: any) => {
			if (res.meta.requestStatus === 'fulfilled') {
				getLikeCount.current -= 1;
				setDidLike(false);
			}
		});
	};

	return (
		<div className='flex pv1'>
			<p className='f4'>{getLikeCount.current ? getLikeCount.current : 0}</p>
			{getDidLike ? (
				<button className='grow pointer b--none bg-transparent' onClick={unlike}>
					<img className='h2 w2' alt='like' src={Like} />
				</button>
			) : (
				<button className='grow pointer b--none bg-transparent' onClick={like}>
					<img className='h2 w2' alt='like' src={UnLike} />
				</button>
			)}
		</div>
	);
};

export default LikeButton;
