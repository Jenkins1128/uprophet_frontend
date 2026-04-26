"use client";
import React, { useRef, useState } from 'react';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { url } from '../../../domain';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchLatestQuotes = async () => {
	const { data } = await axios.get(`${url}/`, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const postQuoteData = async ({ title, quote }: { title: string; quote: string }) => {
	const { data } = await axios.post(`${url}/createQuote`, { title, quote }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const Home: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const [quoteText, setQuoteText] = useState('');

	const mounted = useRef<boolean>(true);

	const { data: latestQuotes = [], isLoading: isQuotesLoading } = useQuery({
		queryKey: ['latestQuotes'],
		queryFn: fetchLatestQuotes,
		enabled: isUserSuccess,
	});

	const { mutate: createQuote } = useMutation({
		mutationFn: postQuoteData,
		onSuccess: (newQuote) => {
			queryClient.setQueryData(['latestQuotes'], (oldData: any[]) => {
				if (!oldData) return [newQuote];
				// remove if user already had a quote (business logic from old slice)
				const filtered = oldData.filter((q: any) => q.user_name !== newQuote.user_name);
				return [newQuote, ...filtered];
			});
		},
	});

	const postQuote = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (title !== '' && quoteText !== '') {
			createQuote({ title, quote: quoteText });
			(event.target as HTMLFormElement).reset();
			setTitle('');
			setQuoteText('');
		}
	};

	const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const onQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setQuoteText(event.target.value);
	};

	if (isUserLoading) return <Loading />;

	if (!isUserSuccess) return <Topquotes isMounted={mounted.current} />;

	if (isQuotesLoading) return <Loading />;

	return (
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
	);
}

export default Home;
