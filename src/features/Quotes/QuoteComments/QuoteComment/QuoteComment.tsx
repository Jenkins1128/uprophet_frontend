"use client";
import React from 'react';
import Userphoto from '../../../Profile/Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';

interface QuoteCommentProps {
	commenter: string;
	comment: string;
	date: string | Date;
}

const QuoteComment: React.FC<QuoteCommentProps> = ({ commenter, comment, date }) => {
	return (
		<article className='bg-white rounded-2xl px-6 py-5 mx-3 my-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
			{/* Header */}
			<div className='flex items-center gap-2'>
				<Link href={`/${commenter}`} className='shrink-0'>
					<Userphoto username={commenter} />
				</Link>
				<Link href={`/${commenter}`} className='no-underline'>
					<p className='text-gray-500 font-bold text-sm m-0'>{commenter}</p>
				</Link>
			</div>

			{/* Comment body */}
			<div className='text-center py-4'>
				<p className='text-base font-bold text-uprophet-mint'>{comment}</p>
			</div>

			{/* Timestamp */}
			<div className='flex justify-end'>
				<span className='text-xs text-gray-400 font-semibold'>
					{date && !isNaN(new Date(typeof date === 'string' ? date.replace(' ', 'T') + 'Z' : date).getTime()) ? (
						<ReactTimeAgo date={new Date(typeof date === 'string' ? date.replace(' ', 'T') + 'Z' : date)} locale='en' timeStyle='mini-minute-now' />
					) : (
						<span>Just now</span>
					)}
				</span>
			</div>
		</article>
	);
};

export default QuoteComment;
