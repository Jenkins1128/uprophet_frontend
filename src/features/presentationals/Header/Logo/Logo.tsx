"use client";
import React from 'react';
import logo from '../../../../images/upicon.png';
import Link from 'next/link';
import Search from '../Search/Search';

interface LogoProps {
	isSignedIn: boolean;
}

const Logo: React.FC<LogoProps> = ({ isSignedIn }) => {
	return (
		<div className='flex items-center'>
			<Link href='/'>
				<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer:hover: pointer' src={logo} alt='Logo' />
			</Link>
			{isSignedIn ? <Search /> : <p className='f4 b white'>Uprophet</p>}
		</div>
	);
};

export default Logo;
