"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '../../../components/ui/PleaseSignin/PleaseSignin';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import Loading from '../../../components/ui/Loading/Loading';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { url } from '../../../domain';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFavoriters = async (username: string) => {
	const { data } = await axios.post(`${url}/favoriters`, { username }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const Favoriters: React.FC = () => {
	const params = useParams();
	const username = params?.username as string;
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();

	const { data: favoriters = [], isLoading: isFavoritersLoading } = useQuery({
		queryKey: ['favoriters', username],
		queryFn: () => fetchFavoriters(username),
		enabled: isUserSuccess && !!username,
	});

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isFavoritersLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>{username}'s Favoriters</h1>
			<div className='mt5'>
				{favoriters.map((result: any) => {
					return <FavoritersCard key={result.id} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default Favoriters;
