"use client";
import React from 'react';
import Link from 'next/link';
import Logo from '../../../../images/upicon.png';
import Bell from '../../../../images/bell.png';
import Compass from '../../../../images/compass.png';
import Home from '../../../../images/home.png';
import Logout from '../../../../images/logout.png';
import Userphoto from '../../../../features/profile/Userphoto/Userphoto';

interface MenuProps {
	NotiDot: React.ComponentType;
	isSignedIn: boolean;
	logout: () => void;
	currentUser: string;
}

const Menu: React.FC<MenuProps> = ({ NotiDot, isSignedIn, logout, currentUser }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleNav = () => setIsOpen(!isOpen);
	const closeNav = () => setIsOpen(false);

	const signout = () => {
		logout();
		closeNav();
	};

	return (
		<>
			<div 
				className='sidenav' 
				style={{ width: isOpen ? '100%' : '0' }}
			>
				<button className='closebtn mt1 mr2 pr0 bg-transparent bn' onClick={closeNav}>
					&times;
				</button>
				
				<div className='flex flex-column mt4'>
					{isSignedIn ? (
						<>
							<Link href='/' onClick={closeNav} className='f6 grow b'>
								<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo.src || Logo} alt='Logo' />
							</Link>
							<Link href='/' onClick={closeNav} className='f6 grow b'>
								<div className='flex items-center'>
									<img title='Home' className='w2 h2' alt='Home' src={Home.src || Home} />
									&nbsp;{'Home'}
								</div>
							</Link>
							<Link href='/notifications' onClick={closeNav} className='f6 grow b'>
								<div className='flex items-center'>
									<div className='relative'>
										<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell.src || Bell} />
										<NotiDot />
									</div>
									&nbsp;{'Notifications'}
								</div>
							</Link>
							<Link href='/explore' onClick={closeNav} className='f6 grow b'>
								<div className='flex items-center'>
									<img title='Explore' className='w2 h2' alt='Compass' src={Compass.src || Compass} />
									&nbsp;{'Explore'}
								</div>
							</Link>
							<Link href={`/${currentUser}`} onClick={closeNav} className='f6 grow b '>
								<div className='flex items-center'>
									<Userphoto size='header' username={currentUser} />
									&nbsp;{'Profile'}
								</div>
							</Link>
							<button onClick={signout} className='f6 grow b bn bg-transparent pointer'>
								<div className='flex items-center'>
									<img title='Logout' className='w2 h2' alt='Logout' src={Logout.src || Logout} />
									&nbsp;{'Logout'}
								</div>
							</button>
						</>
					) : (
						<>
							<Link href='/' onClick={closeNav} className='f6 grow b'>
								<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo.src || Logo} alt='Logo' />
							</Link>
							<Link href='/about' onClick={closeNav} className='f6 grow b'>
								About
							</Link>
							<Link href='/signin' onClick={closeNav} className='f6 grow b'>
								Sign in
							</Link>
							<Link href='/signup' onClick={closeNav} className='f6 grow b'>
								Sign up
							</Link>
							<a onClick={closeNav} className='f6 grow b' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
								Video
							</a>
						</>
					)}
				</div>
			</div>

			<button className='menuIconSize mr2 pr0 pointer bn bg-transparent hover-white' onClick={toggleNav}>
				&#9776;
			</button>
		</>
	);
};

export default Menu;
