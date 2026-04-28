"use client";
import React from 'react';
import { useCurrentUser } from '../../../store/useCurrentUser';
import QuotePost from '../QuotePost/QuotePost';
import { useRouter } from 'next/navigation';
import refreshIcon from '../../../images/refresh.png';
import PleaseSignin from '../../../components/ui/PleaseSignin/PleaseSignin';
import Loading from '../../../components/ui/Loading/Loading';
import { url } from '../../../domain';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchExploreQuotes = async () => {
  const { data } = await axios.get(`${url}/explore`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  });
  return data;
};

const Explore: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();

	const { data: exploreQuotes = [], isLoading: isExploreLoading } = useQuery({
		queryKey: ['exploreQuotes'],
		queryFn: fetchExploreQuotes,
		enabled: isUserSuccess, // Only fetch if user is logged in
	});

	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ['exploreQuotes'] });
	};

	return (
		<>
			{isUserLoading ? (
				<Loading />
			) : isUserSuccess ? (
				<section className='mt6 mh2 f7'>
					<h1 className='moon-gray f4 ml4 mb3'>Explore</h1>
					<div className='flex justify-center mb4'>
						<button className='bg-transparent b--none pointer grow' onClick={refresh}>
							<img alt='refresh' className='h1 w1' src={refreshIcon.src || refreshIcon} />
						</button>
					</div>
					<div className='mt5'>
						{exploreQuotes.map((quote: any) => {
							return (
								<QuotePost key={quote.id} quoteId={quote.id} username={quote.userName} title={quote.title} quote={`"${quote.quote}"`} likeCount={quote.likeCount} didLike={quote.didLike} date={quote.datePosted} hasComments={true} canDelete={false} deleteQuote={() => {}} />
							);
						})}
					</div>
				</section>
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default Explore;
