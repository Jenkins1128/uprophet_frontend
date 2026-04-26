import React from 'react';
import Logo from './Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { useSelector } from 'react-redux';
import { useCurrentUser } from '../../../store/useCurrentUser';

const Header: React.FC = () => {
	 as string;

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={currentUser !== ''} />
			<Navigation currentUser={currentUser} isSignedIn={currentUser !== ''} />
		</header>
	);
};

export default Header;
