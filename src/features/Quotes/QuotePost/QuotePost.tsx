"use client";
import React from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Userphoto from '../../Profile/Userphoto/Userphoto';
import Link from 'next/link';
import ReactTimeAgo from 'react-time-ago';
import Swal from 'sweetalert2';

interface QuotePostProps {
	username: string;
	title: string;
	quote: string;
	quoteId: string | number;
	likeCount: number;
	didLike: boolean;
	date: string | Date;
	hasComments: boolean;
	canDelete?: boolean;
	deleteQuote?: (quoteId: string | number) => void;
}

const QuotePost: React.FC<QuotePostProps> = ({ username, title, quote, quoteId, likeCount, didLike, date, hasComments, canDelete, deleteQuote }) => {
	const deleteMaybe = () => {
		Swal.fire({
			title: 'Delete this quote?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#a1ead0',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				if (deleteQuote) {
					deleteQuote(quoteId);
				}
			}
		});
	};

	return (
		<article
			id={String(quoteId)}
			className='bg-white rounded-2xl px-6 py-5 mx-3 my-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'
		>
			{/* Header: avatar + username + optional delete */}
			<div className='flex items-center'>
				<Link href={`/${username}`} className='shrink-0'>
					<Userphoto username={username} />
				</Link>
				<Link href={`/${username}`} className='no-underline ml-2'>
					<p className='text-gray-500 font-bold text-sm leading-none mt-0 mb-0'>{username}</p>
				</Link>
				{canDelete && (
					<button
						onClick={deleteMaybe}
						className='ml-auto bg-transparent border-none text-red-500 font-bold text-lg cursor-pointer hover:text-red-700 transition-colors'
					>
						&times;
					</button>
				)}
			</div>

			{/* Quote body */}
			<div className='text-center py-5 px-2'>
				{title && (
					<p className='text-sm font-bold underline text-uprophet-mint mb-2 tracking-wide'>{title}</p>
				)}
				<p className='text-base font-bold italic leading-relaxed text-uprophet-mint'>{quote}</p>
			</div>

			{/* Footer: likes + comments + timestamp */}
			<div className='flex justify-between items-center mt-2 px-1'>
				<div className='flex items-center gap-4'>
					<LikeButton quoteId={quoteId} likeCount={likeCount} didLike={didLike} />
					{hasComments && (
						<Link
							href={`/quote/${quoteId}`}
							className='no-underline text-xs font-bold text-uprophet-mint hover:text-green-600 transition-colors'
						>
							Comments
						</Link>
					)}
				</div>
				<div className='text-xs text-gray-400 font-semibold'>
					{date && !isNaN(new Date(date).getTime()) ? (
						<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
					) : (
						<span>Just now</span>
					)}
				</div>
			</div>
		</article>
	);
};

export default QuotePost;
