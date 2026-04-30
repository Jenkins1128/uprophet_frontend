"use client";
import React from 'react';
import Link from 'next/link';
import Logo from '../../../../images/upicon.png';
import Bell from '../../../../images/bell.png';
import Compass from '../../../../images/compass.png';
import Home from '../../../../images/home.png';
import Logout from '../../../../images/logout.png';
import Userphoto from '../../../../features/Profile/Userphoto/Userphoto';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu as MenuIcon } from "lucide-react";

interface MenuProps {
	NotiDot: React.ComponentType;
	isSignedIn: boolean;
	logout: () => void;
	currentUser: string;
}

const Menu: React.FC<MenuProps> = ({ NotiDot, isSignedIn, logout, currentUser }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const closeNav = () => setIsOpen(false);

	const signout = () => {
		logout();
		closeNav();
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button className='p-2 bg-transparent border-none cursor-pointer hover:text-white transition-colors'>
					<MenuIcon className="w-8 h-8" />
				</button>
			</SheetTrigger>
			<SheetContent side="right" className="bg-uprophet-mint border-l-2 border-white/20 w-full sm:w-[300px]">
				<SheetHeader>
					<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
					<Link href='/' onClick={closeNav} className='flex justify-center mb-8'>
						<img title='Home' className='rounded-full border-4 border-white h-24 w-24 object-contain bg-white/20 shadow-lg' src={Logo.src || Logo} alt='Logo' />
					</Link>
				</SheetHeader>
				
				<div className='flex flex-col space-y-4 mt-4'>
					{isSignedIn ? (
						<>
							<Link href='/' onClick={closeNav} className='text-xl font-bold flex items-center p-4 hover:bg-white/10 rounded-lg transition-colors'>
								<img title='Home' className='w-8 h-8 mr-4' alt='Home' src={Home.src || Home} />
								Home
							</Link>
							<Link href='/notifications' onClick={closeNav} className='text-xl font-bold flex items-center p-4 hover:bg-white/10 rounded-lg transition-colors'>
								<div className='relative mr-4'>
									<img title='Notifications' className='w-8 h-8' alt='Notifications' src={Bell.src || Bell} />
									<NotiDot />
								</div>
								Notifications
							</Link>
							<Link href='/explore' onClick={closeNav} className='text-xl font-bold flex items-center p-4 hover:bg-white/10 rounded-lg transition-colors'>
								<img title='Explore' className='w-8 h-8 mr-4' alt='Compass' src={Compass.src || Compass} />
								Explore
							</Link>
							<Link href={`/${currentUser}`} onClick={closeNav} className='text-xl font-bold flex items-center p-4 hover:bg-white/10 rounded-lg transition-colors'>
								<div className="mr-4">
									<Userphoto size='header' username={currentUser} />
								</div>
								Profile
							</Link>
							<button onClick={signout} className='text-xl font-bold flex items-center p-4 hover:bg-white/10 rounded-lg transition-colors bg-transparent border-none w-full text-left cursor-pointer'>
								<img title='Logout' className='w-8 h-8 mr-4' alt='Logout' src={Logout.src || Logout} />
								Logout
							</button>
						</>
					) : (
						<>
							<Link href='/about' onClick={closeNav} className='text-xl font-bold p-4 hover:bg-white/10 rounded-lg transition-colors'>
								About
							</Link>
							<Link href='/signin' onClick={closeNav} className='text-xl font-bold p-4 hover:bg-white/10 rounded-lg transition-colors'>
								Sign in
							</Link>
							<Link href='/signup' onClick={closeNav} className='text-xl font-bold p-4 hover:bg-white/10 rounded-lg transition-colors'>
								Sign up
							</Link>
							<a onClick={closeNav} className='text-xl font-bold p-4 hover:bg-white/10 rounded-lg transition-colors' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
								Video
							</a>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Menu;
