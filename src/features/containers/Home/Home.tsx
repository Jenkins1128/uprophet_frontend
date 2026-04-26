import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { homeAsync, selectLatestQuotes, selectSecondRequestStatus, updateLatestQuotes } from './redux/homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { clearAddedQuote, postQuoteAsync, selectNewQuote } from './redux/postQuoteSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/redux/getUserSlice';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [title, setTitle] = useState('');
	const [quote, setQuote] = useState('');

	const latestQuotes = useSelector(selectLatestQuotes) as any[];
	const getNewQuote = useSelector(selectNewQuote) as any;
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const mounted = useRef<boolean>(false);

	const isEmpty = (obj: any) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatch((getUserAsync as any)(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus1 === 'fulfilled') {
			dispatch((homeAsync as any)(`${url}/`));
		}
	}, [dispatch, requestStatus1]);

	useEffect(() => {
		if (!isEmpty(getNewQuote)) {
			let updatedQuotes = [...latestQuotes];
			//replace your current quote to added quote
			if (updatedQuotes.length) {
				updatedQuotes.some((quote: any, i: number) => {
					if (quote.user_name === getNewQuote.user_name) {
						updatedQuotes.splice(i, 1);
					}
					return quote.user_name === getNewQuote.user_name;
				});
			}
			updatedQuotes.unshift(getNewQuote);
			dispatch(clearAddedQuote());
			//add new quote to latest quotes
			dispatch(updateLatestQuotes(updatedQuotes));
		}
	}, [dispatch, latestQuotes, getNewQuote]);

	const postQuote = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (title !== '' && quote !== '') {
			dispatch((postQuoteAsync as any)({ url: `${url}/createQuote`, title, quote }));
			(event.target as HTMLFormElement).reset();
			setTitle('');
			setQuote('');
		}
	};

	const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTitle(value);
	};

	const onQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const { value } = event.target;
		setQuote(value);
	};

	return (
		<>
			{requestStatus1 === 'pending' ? (
				<Loading />
			) : requestStatus1 === 'fulfilled' ? (
				requestStatus2 === 'pending' ? (
					<Loading />
				) : requestStatus2 === 'fulfilled' ? (
					<section className='mt6 mh2 f7'>
						<h1 className='flex ml4 moon-gray'>Home</h1>
						<QuotePoster postQuote={postQuote} onQuoteChange={onQuoteChange} onTitleChange={onTitleChange} />
						<div className='mt5'>
							{latestQuotes.map((quote: any) => {
								return (
									<QuotePost
										key={quote.id}
										quoteId={quote.id}
										username={quote.user_name}
										title={quote.title}
										quote={`"${quote.quote}"`}
										likeCount={quote.likeCount}
										didLike={quote.didLike}
										date={quote.date_posted}
										hasComments={true}
										canDelete={false}
										deleteQuote={() => {}}
									/>
								);
							})}
						</div>
					</section>
				) : (
					<PleaseSignin />
				)
			) : (
				<Topquotes isMounted={mounted.current} />
			)}
		</>
	);
}

export default Home;
