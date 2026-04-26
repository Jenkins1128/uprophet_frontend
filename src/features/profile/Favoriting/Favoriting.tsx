"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '../../../components/ui/PleaseSignin/PleaseSignin';
import FavoritingCard from './FavoritingCard/FavoritingCard';
import Loading from '../../../components/ui/Loading/Loading';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { url } from '../../../domain';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFavoriting = async (username: string) => {
	const { data } = await axios.post(`${url}/favoriting`, { username }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const Favoriting: React.FC = () => {
	const params = useParams();
	const username = params?.username as string;
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();

	const { data: favoriting = [], isLoading: isFavoritingLoading } = useQuery({
		queryKey: ['favoriting', username],
		queryFn: () => fetchFavoriting(username),
		enabled: isUserSuccess && !!username,
	});

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isFavoritingLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>{username}'s Favoriting</h1>
			<div className='mt5'>
				{favoriting.map((result: any) => {
					return <FavoritingCard key={result.id} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default Favoriting;
