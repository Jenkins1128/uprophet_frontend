import React from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Userphoto from '../Userphoto/Userphoto';
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
		<article id={String(quoteId)} className=' bg-transparent br7 pv3 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph3'>
			<div className='flex justify-between'>
				<div className='flex'>
					<Linkhref={`/${username}`}>
						<Userphoto username={username} />
					</Link>
					<Linkhref={`/${username}`} className='no-underline'>
						<p className='black-50 b relative top--1 '>{username}</p>
					</Link>
				</div>
				<div>
					{canDelete && (
						<button onClick={deleteMaybe} className='bg-transparent b--none red b f5 pointer'>
							X
						</button>
					)}
				</div>
			</div>
			<div className='pt3 ph3'>
				<p className='f6 b underline light-green'>{title}</p>
				<p className='f6 mt3 light-green b'>{quote}</p>
			</div>
			<div className='flex justify-between mt5 h1 ph4'>
				<div className='flex items-center'>
					<LikeButton quoteId={quoteId} likeCount={likeCount} didLike={didLike} />
					{hasComments && (
						<Linkhref={`/quote/${quoteId}`} className='ml4 no-underline f5 b light-green grow '>
							Comments
						</Link>
					)}
				</div>
				<div>
					<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
				</div>
			</div>
		</article>
	);
};

export default QuotePost;
