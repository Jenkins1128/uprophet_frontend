"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import ResultCard from './ResultCard/ResultCard';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '@/api/user';
import type { SearchResult } from '@/types';

const SearchResults: React.FC = () => {
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
			<h1 className='flex ml4 moon-gray'>Search Results for &quot;{searchtext || ''}&quot;</h1>
			<div className='mt5'>
				{results.map((result: SearchResult) => {
					return <ResultCard key={result.id} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
				})}
			</div>
		</section>
	);
};

export default SearchResults;
