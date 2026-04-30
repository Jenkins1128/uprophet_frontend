"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Bell from '../../../images/bell.png';
import Compass from '../../../images/compass.png';
import Home from '../../../images/home.png';
import Logout from '../../../images/logout.png';
import Menu from './Menu/Menu';
import Userphoto from '../../../features/Profile/Userphoto/Userphoto';
import { url } from '../../../domain';
import { useCurrentUser } from '../../../store/useCurrentUser';
import NotiDot from '../../ui/NotiDot/NotiDot';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface NavigationProps {
	hasNotifications?: boolean;
	currentUser: string;
	isSignedIn: boolean;
}

const logoutData = async () => {
	const { data } = await axios.post(`${url}/logout`, {}, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const Navigation: React.FC<NavigationProps> = ({ hasNotifications, currentUser, isSignedIn }) => {
	const [hasMounted, setHasMounted] = React.useState(false);

	React.useEffect(() => {
		setHasMounted(true);
	}, []);

	const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: performLogout } = useMutation({
		mutationFn: logoutData,
		onSuccess: () => {
			queryClient.setQueryData(['currentUser'], '');
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			router.push('/signin');
		}
	});

	const logout = () => {
		performLogout();
	};

	if (!hasMounted) {
		return <nav className='flex items-center' />; // Render empty nav until mounted to avoid mismatch
	}

	return (
		<nav className='flex items-center'>
			{isMobile ? (
				<Menu NotiDot={NotiDot} isSignedIn={isSignedIn} logout={logout} currentUser={currentUser} />
			) : (
				isSignedIn ? (
					<div className="flex items-center space-x-4">
						<Link href='/' className='text-sm font-bold no-underline transition-transform hover:scale-105 px-4'>
							<img title='Home' className='w-8 h-8' alt='Home' src={Home.src || Home} />
						</Link>
						<Link href='/notifications' className='text-sm font-bold no-underline transition-transform hover:scale-105 px-4'>
							<div className='relative'>
								<img title='Notifications' className='w-8 h-8' alt='Notifications' src={Bell.src || Bell} />
								<NotiDot />
							</div>
						</Link>
						<Link href='/explore' className='text-sm font-bold transition-transform hover:scale-105 px-4'>
							<img title='Explore' className='w-8 h-8' alt='Compass' src={Compass.src || Compass} />
						</Link>
						<Link href={`/${currentUser}`} className='transition-transform hover:scale-105 px-4'>
							<Userphoto size='header' username={currentUser} />
						</Link>
						<button onClick={logout} className='bg-transparent border-none cursor-pointer transition-transform hover:scale-105 px-4'>
							<img title='Logout' className='w-8 h-8' alt='Logout' src={Logout.src || Logout} />
						</button>
					</div>
				) : (
					<div className="flex items-center space-x-4">
						<Link href='/about' className='text-sm font-bold no-underline text-black hover:text-white transition-colors px-4'>
							About
						</Link>
						<Link href='/signin' className='text-sm font-bold no-underline text-black hover:text-white transition-colors px-4'>
							Sign in
						</Link>
						<Link href='/signup' className='text-sm font-bold no-underline text-black hover:text-white transition-colors px-4'>
							Sign up
						</Link>
						<a className='text-sm font-bold no-underline text-black hover:text-white transition-colors px-4' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
							Video
						</a>
					</div>
				)
			)}
		</nav>
	);
};

export default Navigation;
