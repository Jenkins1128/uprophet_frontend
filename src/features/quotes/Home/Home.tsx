"use client";
import React, { useState } from 'react';
import TopQuotes from '../TopQuotes/TopQuotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from '../Home/QuotePoster/QuotePoster';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLatestQuotes, createQuoteRequest } from '@/api/quotes';
import type { Quote } from '@/types';

const Home: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const [quoteText, setQuoteText] = useState('');

	const { data: latestQuotes = [], isLoading: isQuotesLoading } = useQuery({
		queryKey: ['latestQuotes'],
		queryFn: fetchLatestQuotes,
		enabled: isUserSuccess,
	});

	const { mutate: createQuote } = useMutation({
		mutationFn: createQuoteRequest,
		onSuccess: (newQuote: Quote) => {
			queryClient.setQueryData(['latestQuotes'], (oldData: Quote[] | undefined) => {
				if (!oldData) return [newQuote];
				// remove if user already had a quote (business logic from old slice)
				const filtered = oldData.filter((q) => q.userName !== newQuote.userName);
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

	if (!isUserSuccess) return <TopQuotes />;

	if (isQuotesLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Home</h1>
			<QuotePoster postQuote={postQuote} onQuoteChange={onQuoteChange} onTitleChange={onTitleChange} />
			<div className='mt5'>
				{latestQuotes.map((quote: Quote) => {
					return (
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
					);
				})}
			</div>
		</section>
	);
}

export default Home;
