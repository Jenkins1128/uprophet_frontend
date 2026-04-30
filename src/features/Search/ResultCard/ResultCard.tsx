import React from 'react';
import FavoriteButton from '../../Profile/FavoriteButton/FavoriteButton';
import Userphoto from '../../Profile/Userphoto/Userphoto';
import Link from 'next/link';

interface ResultCardProps {
	currentUser: string;
	username: string;
	didFavorite: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ currentUser, username, didFavorite }) => {
	return (
		<article className='flex justify-between items-center w-full border-b border-gray-100 py-3 px-2'>
			<div className='flex items-center gap-3'>
				<Link href={`/${username}`} className='shrink-0'>
					<Userphoto username={username} />
				</Link>
				<Link href={`/${username}`} className='no-underline'>
					<h2 className='text-base font-semibold text-uprophet-mint hover:text-green-700 transition-colors m-0 leading-tight'>
						{username}
					</h2>
				</Link>
			</div>
			<div>{currentUser !== username && <FavoriteButton username={username} didFavorite={didFavorite} />}</div>
		</article>
	);
};

export default ResultCard;
