"use client";
import React from 'react';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import Notification from './Notification/Notification';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/api/user';
import type { NotificationItem } from '@/types';

const Notifications: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();

	const { data: notifications = [], isLoading: isNotificationsLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: fetchNotifications,
		enabled: isUserSuccess,
	});

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isNotificationsLoading) return <Loading />;

	return (
		<section className='pt-24 pb-8 px-2'>
			<h1 className='text-gray-400 font-semibold text-sm ml-4 mb-6'>Notifications</h1>
			<div className='mx-3 lg:mx-24 md:mx-16'>
				{notifications.map((notification: NotificationItem) => {
					return (
						<Notification
							key={notification.id}
							username={notification.notice.split(' ')[0]}
							notice={notification.notice}
							quotesId={notification.quotesId}
							date={notification.date}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Notifications;
