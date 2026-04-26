"use client";
import React from 'react';
import Logo from './Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { useCurrentUser } from '../../../store/useCurrentUser';

const Header: React.FC = () => {
	const { data: currentUser = '' } = useCurrentUser();

	return (
		<header className='flex justify-between z-1 fixed top-0 w-100 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={currentUser !== ''} />
			<Navigation currentUser={currentUser as string} isSignedIn={currentUser !== ''} />
		</header>
	);
};

export default Header;
