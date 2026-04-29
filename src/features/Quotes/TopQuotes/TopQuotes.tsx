import React from 'react';
import QuoteCard from './QuoteCard';
import { UsersQuotes } from './UserQuotes';

const TopQuotes: React.FC = () => {
	return (
		<section className='mt6 mh2'>
			<h1 className='moon-gray f3 tc'>Express yourself freely</h1>
			<div className='flex-wrap overflow-y-scroll'>
				{UsersQuotes.map((user, i) => {
					return <QuoteCard key={i} userName={user.userName} quote={user.quote} />;
				})}
			</div>
		</section>
	);
};

export default TopQuotes;
