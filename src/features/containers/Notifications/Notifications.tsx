import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification/Notification';
import { getNotificationsAsync, selectNotifications, selectRequestStatus } from './redux/notificationsSlice';
import { useCurrentUser } from '../../../store/useCurrentUser';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const Notifications: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const notifications = useSelector(selectNotifications) as any[];

	

	useEffect(() => {
		dispatch((getNotificationsAsync as any)(`${url}/notifications`));
	}, [dispatch]);

	return (
		<>
			{requestStatus1 === 'pending' ? (
				<Loading />
			) : requestStatus1 === 'fulfilled' ? (
				requestStatus2 === 'pending' ? (
					<Loading />
				) : requestStatus2 === 'fulfilled' ? (
					<section className='mt6 mh2 f7'>
						<h1 className='flex ml4 moon-gray'>Notifications</h1>
						<div className='mt5'>
							{notifications.map((notification: any) => {
								return <Notification key={notification.id} username={notification.notice.split(' ')[0]} notice={notification.notice} quotesId={notification.quotes_id} date={notification.date} />;
							})}
						</div>
					</section>
				) : (
					<PleaseSignin />
				)
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default Notifications;
