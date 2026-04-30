import React from 'react';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import Userphoto from '../../Userphoto/Userphoto';
import Link from 'next/link';

interface FavoritersCardProps {
	currentUser: string;
	username: string;
	didFavorite: boolean;
}

const FavoritersCard: React.FC<FavoritersCardProps> = ({ currentUser, username, didFavorite }) => {
	return (
		<article className='flex justify-between items-center w-full border-b border-gray-100 pb-3 mt-3 px-4'>
			<div className='flex items-center gap-3'>
				<Link href={`/${username}`}>
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

export default FavoritersCard;
