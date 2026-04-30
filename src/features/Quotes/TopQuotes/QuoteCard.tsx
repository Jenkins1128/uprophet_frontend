import React from 'react';
import defaultProfilePic from '../../../images/defaultProfilePic.png';

interface QuoteCardProps {
	userName: string;
	quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ userName, quote }) => {
	return (
		<article className='relative bg-white rounded-2xl py-8 my-3 mx-3 lg:mx-24 md:mx-16 px-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
			{/* Avatar + username */}
			<div className='flex items-center mb-6'>
				<img
					className='rounded-full border-2 border-white bg-white h-12 w-12 object-cover'
					src={defaultProfilePic.src || defaultProfilePic}
					alt='Profile'
				/>
				<p className='text-gray-500 font-bold ml-2 text-sm'>{userName}</p>
			</div>

			{/* Quote */}
			<div className='text-center px-3'>
				<p className='text-uprophet-mint font-bold italic leading-relaxed'>
					&quot;{quote}&quot;
				</p>
			</div>
		</article>
	);
};

export default QuoteCard;
