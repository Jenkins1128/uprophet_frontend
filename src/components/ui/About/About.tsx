import React from 'react';
import profilePic from '../../../images/profile.jpg';

const About: React.FC = () => {
	return (
		<>
		<section className='pt6 tc ph3'>
			<div className='mw7 center'>
				<h1 className='moon-gray f2 f1-ns mb2'>About Uprophet</h1>
				<p className='light-green f4 i mb5'>&quot;Empowering your voice, one quote at a time.&quot;</p>

				<div className='flex flex-column flex-row-ns items-center bg-near-white pa4 br4 shadow-5 tl'>
					<div className='w-100 w-30-ns mb4 mb0-ns mr4-ns tc'>
						<img className='br-100 ba bw2 b--light-green h5 w5 shadow-4' style={{ objectFit: 'cover' }} src={profilePic.src || profilePic} alt='Isaiah Jenkins' />
						<h3 className='f4 moon-gray mt3 mb1'>Isaiah Jenkins</h3>
						<p className='f6 light-green i'>Founder</p>
					</div>

					<div className='w-100 w-70-ns lh-copy black-80'>
						<h2 className='f3 light-green mb3'>Our Mission</h2>
						<p className='f5 mb3'>
							Uprophet was launched on August 1, 2015, with a singular vision: to create a sanctuary where the power of words could roam free. We&apos;ve built this space for those who find inspiration in the unexpected and strength in the shared human experience.
						</p>
						<p className='f5 mb3'>
							Whether you&apos;re sharing a timeless classic or an original thought that just crossed your mind, Uprophet is your stage. We believe every voice has the potential to inspire, and every quote has the power to change a perspective.
						</p>
						<p className='f5 b mt4 tc tl-ns'>
							Express yourself. Share your journey. Be U.
						</p>
					</div>
				</div>

				<div className='mt5 moon-gray f7 pb4'>
					<p>© 2026 Uprophet. Established 2015.</p>
				</div>
			</div>
		</section>
		</>
	);
};

export default About;
