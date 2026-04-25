import React, { useEffect } from 'react';
import RedDot from '../../../images/reddot.png';
import { useTime } from 'react-time-sync';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationCountAsync, selectNotificationCount } from './redux/getNotificationCountSlice';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const NotiDot: React.FC = () => {
	const timeLeft = useTime();
	const dispatch = useDispatch<AppDispatch>();
	const notificationCount = useSelector(selectNotificationCount) as number;

	useEffect(() => {
		dispatch((getNotificationCountAsync as any)(`${url}/getNotificationCount`));
	}, [dispatch, timeLeft]);

	return notificationCount > 0 ? <img alt='notidot' className='absolute left-1 h1 w1' src={RedDot} /> : null;
};

export default NotiDot;
