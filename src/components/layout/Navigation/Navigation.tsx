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
import Userphoto from '../../../features/profile/Userphoto/Userphoto';
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
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	});
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 889px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	});
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

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

	return (
		<nav className='flex items-center'>
			{(isDesktopOrLaptop || isTabletOrMobileDevice) && (
				<>
					{!(isTabletOrMobile || isPortrait) ? (
						isSignedIn ? (
							<>
								<Link href='/' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									<img title='Home' className='w2 h2' alt='Home' src={Home} />
								</Link>
								<Link href='/notifications' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									<div className='relative'>
										<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
										<NotiDot />
									</div>
								</Link>
								<Link href='/explore' className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent '>
									<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
								</Link>
								<Link href={`/${currentUser}`} className='f6 grow no-underline mh3 mb2 dib'>
									<Userphoto size='header' username={currentUser} />
								</Link>
								<button onClick={logout} className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent pointer'>
									<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
								</button>
							</>
						) : (
							<>
								<Link href='/about' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									About
								</Link>
								<Link href='/signin' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									Sign in
								</Link>
								<Link href='/signup' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									Sign up
								</Link>
								<a className='f6 grow no-underline b--none b ba bw1 ph3 mh3 dib black hover-white' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
									Video
								</a>
							</>
						)
					) : (
						<Menu NotiDot={NotiDot} isSignedIn={isSignedIn} logout={logout} currentUser={currentUser} />
					)}
				</>
			)}
		</nav>
	);
};

export default Navigation;
