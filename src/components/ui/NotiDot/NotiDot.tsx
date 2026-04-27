"use client";
import React from 'react';
import RedDot from '../../../images/reddot.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { url } from '../../../domain';

const fetchNotificationCount = async () => {
  const { data } = await axios.get(`${url}/getNotificationCount`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  });
  return data.notificationCount;
};

const NotiDot: React.FC = () => {
  const { data: notificationCount } = useQuery({
    queryKey: ['notificationCount'],
    queryFn: fetchNotificationCount,
    refetchInterval: 10000, // Refetch every 10 seconds instead of every second for better performance
  });

  return (notificationCount && notificationCount > 0) ? <img alt='notidot' className='absolute left-1 h1 w1' src={RedDot.src || RedDot} /> : null;
};

export default NotiDot;
