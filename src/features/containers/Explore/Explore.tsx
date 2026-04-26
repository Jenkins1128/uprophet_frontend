import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/redux/getUserSlice';
import QuotePost from '../QuotePost/QuotePost';
import { getExploreQuotesAsync, selectExploreQuotes } from './redux/exploreQuotesSlice';
import { useRouter } from 'next/navigation';
import refreshIcon from '../../../images/refresh.png';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const Explore: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const requestStatus = useSelector(selectFirstRequestStatus);
	const exploreQuotes = useSelector(selectExploreQuotes) as any[];

	useEffect(() => {
		dispatch((getUserAsync as any)(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus === 'fulfilled') {
			dispatch((getExploreQuotesAsync as any)(`${url}/explore`));
		}
	}, [requestStatus, dispatch]);

	const refresh = () => {
		router.refresh();
	};

	return (
		<>
			{requestStatus === 'pending' ? (
				<Loading />
			) : requestStatus === 'fulfilled' ? (
				<section className='mt6 mh2 f7'>
					<h1 className='flex ml4 moon-gray'>Explore</h1>
					<button className='bg-transparent b--none pointer grow' onClick={refresh}>
						<img alt='refresh' className='h1 w1' src={refreshIcon} />
					</button>
					<div className='mt5'>
						{exploreQuotes.map((quote: any) => {
							return (
								<QuotePost key={quote.id} quoteId={quote.id} username={quote.user_name} title={quote.title} quote={`"${quote.quote}"`} likeCount={quote.likeCount} didLike={quote.didLike} date={quote.date_posted} hasComments={true} canDelete={false} deleteQuote={() => {}} />
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
