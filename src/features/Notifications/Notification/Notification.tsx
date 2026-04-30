import React from 'react';
import Link from 'next/link';
import Userphoto from '../../Profile/Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';

interface NotificationProps {
	username: string;
	notice: string;
	quotesId?: string | number | null;
	date: string | Date;
}

import { ArrowRight } from 'lucide-react';

const Notification: React.FC<NotificationProps> = ({ username, notice, quotesId, date }) => {
	return (
		<article className='flex justify-between items-center w-full border-b border-gray-100 py-3 px-2'>
			<div className='flex items-center gap-3'>
				<Link href={`/${username}`} className='shrink-0'>
					<Userphoto username={username} />
				</Link>
				<div>
					<p className='text-sm font-semibold text-uprophet-mint leading-tight mb-0.5'>{notice}</p>
					<span className='text-xs text-gray-400'>
					{date && !isNaN(new Date(typeof date === 'string' ? date.replace(' ', 'T') + 'Z' : date).getTime()) ? (
						<ReactTimeAgo date={new Date(typeof date === 'string' ? date.replace(' ', 'T') + 'Z' : date)} locale='en' timeStyle='mini-minute-now' />
					) : (
						<span>Just now</span>
					)}
					</span>
				</div>
			</div>
			<div className='shrink-0'>
				{!quotesId ? (
					<Link href={`/${username}`} className='flex items-center justify-center w-9 h-9 rounded-full bg-uprophet-mint hover:bg-uprophet-mint/80 transition-colors'>
						<ArrowRight className='w-4 h-4 text-gray-700' />
					</Link>
				) : (
					<Link href={`/quote/${quotesId}`} className='flex items-center justify-center w-9 h-9 rounded-full bg-uprophet-mint hover:bg-uprophet-mint/80 transition-colors'>
						<ArrowRight className='w-4 h-4 text-gray-700' />
					</Link>
				)}
			</div>
		</article>
	);
};

export default Notification;
