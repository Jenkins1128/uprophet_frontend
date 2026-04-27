"use client";
import React from 'react';
import { url } from '../../../domain';
import Loading from '../../../components/ui/Loading/Loading';
import defaultProfilePic from '../../../images/defaultProfilePic.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UserphotoProps {
	size?: string;
	username: string;
}

const fetchUserPhoto = async (username: string) => {
	const { data } = await axios.post(`${url}/getPhoto`, { username }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const Userphoto: React.FC<UserphotoProps> = ({ size, username }) => {
	const { data = {}, isLoading } = useQuery({
		queryKey: ['userPhoto', username],
		queryFn: () => fetchUserPhoto(username),
		enabled: !!username,
		staleTime: Infinity,
		gcTime: Infinity,
		retry: false
	});

	const getSize = () => {
		switch (size) {
			case 'header':
				return 'h2 w2';
			case 'profile':
				return 'h4 w4';
			default:
				return 'h3 w3';
		}
	};

	const base64Img = data.photo || '';

	return isLoading ? <Loading isPhoto={true} size={size} /> : <img className={`br-100 ba bw1 b--white bg-white ${getSize()}`} src={base64Img ? `data:image;base64,${base64Img}` : defaultProfilePic.src || defaultProfilePic} alt='UserPhoto' />;
};

export default Userphoto;
