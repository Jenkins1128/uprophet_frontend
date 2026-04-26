import React from 'react';
import Link from 'next/link';
import Logo from '../../../../images/upicon.png';
import Bell from '../../../../images/bell.png';
import Compass from '../../../../images/compass.png';
import Home from '../../../../images/home.png';
import Logout from '../../../../images/logout.png';
import Userphoto from '../../../containers/Userphoto/Userphoto';

interface MenuProps {
	NotiDot: React.ComponentType;
	isSignedIn: boolean;
	logout: () => void;
	currentUser: string;
}

const Menu: React.FC<MenuProps> = ({ NotiDot, isSignedIn, logout, currentUser }) => {
	const openNav = () => {
		const el = document.getElementById('mySidenav');
		if (el) el.style.width = '100%';
	};

	const closeNav = () => {
		const el = document.getElementById('mySidenav');
		if (el) el.style.width = '0';
	};

	const signout = () => {
		logout();
		closeNav();
	};

	return (
		<>
			{isSignedIn ? (
				<div id='mySidenav' className='sidenav'>
					<button className='closebtn mt1 mr2 pr0' onClick={closeNav}>
						&times;
					</button>
					<Linkhref='/' onClick={closeNav} className='f6 grow b'>
						<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo} alt='Logo' />
					</Link>
					<Linkhref='/' onClick={closeNav} className='f6 grow b'>
						<div className='flex items-center'>
							<img title='Home' className='w2 h2' alt='Home' src={Home} />
							&nbsp;{'Home'}
						</div>
					</Link>
					<Linkhref='/notifications' onClick={closeNav} className='f6 grow b'>
						<div className='flex items-center'>
							<div className='relative'>
								<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
								<NotiDot />
							</div>
							&nbsp;{'Notifications'}
						</div>
					</Link>
					<Linkhref='/explore' onClick={closeNav} className='f6 grow b'>
						<div className='flex items-center'>
							<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
							&nbsp;{'Explore'}
						</div>
					</Link>
					<Linkhref={`/${currentUser}`} onClick={closeNav} className='f6 grow b '>
						<div className='flex items-center'>
							<Userphoto size='header' username={currentUser} />
							&nbsp;{'Profile'}
						</div>
					</Link>
					<Linkhref='#' onClick={signout} className='f6 grow b'>
						<div className='flex items-center'>
							<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
							&nbsp;{'Logout'}
						</div>
					</Link>
				</div>
			) : (
				<div id='mySidenav' className='sidenav'>
					<button className='closebtn mt1 mr2 pr0' onClick={closeNav}>
						&times;
					</button>
					<Linkhref='/' onClick={closeNav} className='f6 grow b'>
						<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo} alt='Logo' />
					</Link>
					<Linkhref='/about' onClick={closeNav} className='f6 grow b'>
						About
					</Link>
					<Linkhref='/signin' onClick={closeNav} className='f6 grow b'>
						Sign in
					</Link>
					<Linkhref='/signup' onClick={closeNav} className='f6 grow b'>
						Sign up
					</Link>
					<a onClick={closeNav} className='f6 grow b' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
						Video
					</a>
				</div>
			)}
			<button className='menuIconSize mr2 pr0 pointer b--none bg-transparent hover-white' onClick={openNav}>
				&#9776;
			</button>
		</>
	);
};

export default Menu;
