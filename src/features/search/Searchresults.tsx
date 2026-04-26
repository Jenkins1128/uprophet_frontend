"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '../../components/ui/PleaseSignin/PleaseSignin';
import ResultCard from './ResultCard/ResultCard';
import Loading from '../../components/ui/Loading/Loading';
import { useCurrentUser } from '../../store/useCurrentUser';
import { url } from '../../domain';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSearchResults = async (search: string) => {
	const { data } = await axios.post(`${url}/search`, { search }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const Searchresults: React.FC = () => {
	const params = useParams();
	const searchtext = params?.searchtext as string;
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();

	const { data: results = [], isLoading: isSearchLoading } = useQuery({
		queryKey: ['search', searchtext],
		queryFn: () => fetchSearchResults(searchtext),
		enabled: isUserSuccess && !!searchtext && searchtext.trim() !== '',
	});

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isSearchLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Search Results for "{searchtext || ''}"</h1>
			<div className='mt5'>
				{results.map((result: any) => {
					return <ResultCard key={result.id} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default Searchresults;
