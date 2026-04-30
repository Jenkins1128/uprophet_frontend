import React from 'react';
import QuoteCard from './QuoteCard';
import { UsersQuotes } from './UserQuotes';

const TopQuotes: React.FC = () => {
	return (
		<section className='pt-24 pb-8 px-2'>
			<h1 className='text-gray-400 font-normal text-2xl text-center mb-6'>Express yourself freely</h1>
			<div className='overflow-y-auto'>
				{UsersQuotes.map((user, i) => {
					return <QuoteCard key={i} userName={user.userName} quote={user.quote} />;
				})}
			</div>
		</section>
	);
};

export default TopQuotes;
