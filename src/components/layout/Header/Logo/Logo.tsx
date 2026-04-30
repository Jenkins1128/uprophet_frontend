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
		<div className='flex items-center gap-3'>
			<Link href='/' className='shrink-0'>
				<img title='Home' className='rounded-full border-4 border-white m-2 h-12 w-12 cursor-pointer transition-transform hover:scale-105' src={logo.src || logo} alt='Logo' />
			</Link>
			{isSignedIn ? <Search /> : <p className='text-xl font-bold text-white whitespace-nowrap'>Uprophet</p>}
		</div>
	);
};

export default Logo;
