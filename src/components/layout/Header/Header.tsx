"use client";
import React from 'react';
import Logo from './Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { useCurrentUser } from '../../../store/useCurrentUser';

const Header: React.FC = () => {
	const { data: currentUser = '' } = useCurrentUser();

	return (
		<header className='flex justify-between items-center z-10 fixed top-0 w-full border-b-2 border-uprophet-light-green bg-uprophet-light-green px-4 h-16'>
			<Logo isSignedIn={currentUser !== ''} />
			<Navigation currentUser={currentUser as string} isSignedIn={currentUser !== ''} />
		</header>
	);
};

export default Header;
