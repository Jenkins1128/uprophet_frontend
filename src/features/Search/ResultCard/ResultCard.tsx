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
		<article className='flex justify-between dt w-100 bb b--black-05 pb2 mt2'>
			<div className='flex items-center'>
				<div className='dtc w3 v-mid'>
					<Link href={`/${username}`}>
						<Userphoto username={username} />
					</Link>
				</div>
				<div className='dtc v-mid pl3'>
					<Link href={`/${username}`} className='no-underline'>
						<h1 className='f6 f5-ns fw6 lh-title light-green mv0'>{username}</h1>
					</Link>
				</div>
			</div>
			<div className='self-center'>{currentUser !== username && <FavoriteButton username={username} didFavorite={didFavorite} />}</div>
		</article>
	);
};

export default ResultCard;
