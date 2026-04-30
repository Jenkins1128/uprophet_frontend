"use client";
import React from 'react';
import { useCurrentUser } from '@/store/useCurrentUser';
import QuotePost from '../QuotePost/QuotePost';
import refreshIcon from '@/images/refresh.png';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import Loading from '@/components/ui/Loading/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExploreQuotes } from '@/api/quotes';
import type { Quote } from '@/types';
import { RefreshCw } from 'lucide-react';

const Explore: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();

	const { data: exploreQuotes = [], isLoading: isExploreLoading } = useQuery({
		queryKey: ['exploreQuotes'],
		queryFn: fetchExploreQuotes,
		enabled: isUserSuccess,
	});

	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ['exploreQuotes'] });
	};

	return (
		<>
			{isUserLoading ? (
				<Loading />
			) : isUserSuccess ? (
				<section className='pt-24 pb-8 px-2'>
					<div className='flex items-center justify-between ml-4 mr-4 mb-6'>
						<h1 className='text-gray-400 font-semibold text-sm'>Explore</h1>
						<button
							className='bg-transparent border-none cursor-pointer text-uprophet-mint hover:text-green-600 transition-all hover:scale-110 p-2 rounded-full'
							onClick={refresh}
							title='Refresh'
						>
							<RefreshCw className='h-5 w-5' />
						</button>
					</div>
					<div>
						{isExploreLoading ? (
							<Loading />
						) : (
							exploreQuotes.map((quote: Quote) => (
								<QuotePost
									key={quote.id}
									quoteId={quote.id}
									username={quote.userName}
									title={quote.title}
									quote={`"${quote.quote}"`}
									likeCount={quote.likeCount}
									didLike={quote.didLike}
									date={quote.datePosted}
									hasComments={true}
									canDelete={false}
									deleteQuote={() => {}}
								/>
							))
						)}
					</div>
				</section>
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default Explore;
