"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriters } from '@/api/user';
import type { FavoriteRelation } from '@/types';

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
		<section className='pt-24 pb-8 px-2'>
			<h1 className='text-gray-400 font-semibold text-lg ml-4 mb-4'>{username}&apos;s Favoriters</h1>
			<div className='mx-3 lg:mx-24 md:mx-16'>
				{favoriters.map((result: FavoriteRelation) => {
					return <FavoritersCard key={result.from_user} currentUser={result.currentUser} username={result.from_user} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default Favoriters;
