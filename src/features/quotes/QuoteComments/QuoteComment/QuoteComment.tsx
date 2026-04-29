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
		<article className='bg-near-white br4 pa3 pa4-ns ma3 mh6-l mh4-m shadow-5'>
			<div className='flex items-start'>
				<Link href={`/${commenter}`}>
					<Userphoto username={commenter} />
				</Link>
				<Link href={`/${commenter}`} className='no-underline ml2'>
					<p className='black-50 b f7 f6-ns mv1'>{commenter}</p>
				</Link>
			</div>
			
			<div className='tc pv3'>
				<p className='f6 f5-ns light-green b'>{comment}</p>
			</div>

			<div className='flex justify-end mt3 ph2'>
				<div className='f7 moon-gray b'>
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

export default QuoteComment;
