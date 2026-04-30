"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import FavoritingCard from './FavoritingCard/FavoritingCard';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriting } from '@/api/user';
import type { FavoriteRelation } from '@/types';

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
		<section className='pt-24 pb-8 px-2'>
			<h1 className='text-gray-400 font-semibold text-lg ml-4 mb-4'>{username}&apos;s Favoriting</h1>
			<div className='mx-3 lg:mx-24 md:mx-16'>
				{favoriting.map((result: FavoriteRelation) => {
					return <FavoritingCard key={result.to_user} currentUser={result.currentUser} username={result.to_user} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default Favoriting;
