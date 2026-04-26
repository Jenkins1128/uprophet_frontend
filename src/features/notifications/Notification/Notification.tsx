import React from 'react';
import forward from '../../../images/forward.png';
import Link from 'next/link';
import Userphoto from '../../profile/Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';

interface NotificationProps {
	username: string;
	notice: string;
	quotesId?: string | number | null;
	date: string | Date;
}

const Notification: React.FC<NotificationProps> = ({ username, notice, quotesId, date }) => {
	return (
		<article className='flex justify-between w-100 bb b--black-05 pb2 mt2'>
			<div className='flex items-center'>
				<div className='dtc w3 v-mid'>
					<Link href={`/${username}`}>
						<Userphoto username={username} />
					</Link>
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f7 f5-ns fw6 lh-title light-green mv0'>{notice}</h1>
					<div>
						<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
					</div>
				</div>
			</div>
			<div className='self-center'>
				{!quotesId ? (
					<Link href={`/${username}`}>
						<img src={forward.src || forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</Link>
				) : (
					<Link href={`/quote/${quotesId}`}>
						<img src={forward.src || forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</Link>
				)}
			</div>
		</article>
	);
};

export default Notification;
