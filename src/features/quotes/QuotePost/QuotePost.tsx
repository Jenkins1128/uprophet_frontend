"use client";
import React from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Userphoto from '../../profile/Userphoto/Userphoto';
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
		<article id={String(quoteId)} className='bg-near-white br4 pa3 pa4-ns ma3 mh6-l mh4-m shadow-5'>
			<div className='flex items-start'>
				<Link href={`/${username}`}>
					<Userphoto username={username} />
				</Link>
				<Link href={`/${username}`} className='no-underline ml2'>
					<p className='black-50 b f7 f6-ns mv1'>{username}</p>
				</Link>
				{canDelete && (
					<button onClick={deleteMaybe} className='bg-transparent b--none red b f5 pointer ml-auto'>
						X
					</button>
				)}
			</div>
			
			<div className='tc pv3'>
				<p className='f6 f5-ns b underline light-green mb2'>{title}</p>
				<p className='f6 f5-ns light-green b i lh-copy'>{quote}</p>
			</div>

			<div className='flex justify-between items-center mt4 ph2'>
				<div className='flex items-center'>
					<LikeButton quoteId={quoteId} likeCount={likeCount} didLike={didLike} />
					{hasComments && (
						<Link href={`/quote/${quoteId}`} className='ml4 no-underline f7 f6-ns b light-green grow'>
							Comments
						</Link>
					)}
				</div>
				<div className='f7 moon-gray b'>
					<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
				</div>
			</div>
		</article>
	);
};

export default QuotePost;
