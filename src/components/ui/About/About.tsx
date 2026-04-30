import React from 'react';
import profilePic from '../../../images/profile.jpg';

const About: React.FC = () => {
	return (
		<section className='pt-24 text-center px-4 pb-12'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-gray-400 text-4xl font-normal mb-2'>About Uprophet</h1>
				<p className='text-uprophet-mint text-xl italic mb-10'>&quot;Empowering your voice, one quote at a time.&quot;</p>

				<div className='flex flex-col md:flex-row items-center bg-white px-8 py-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-left gap-8'>
					{/* Founder photo */}
					<div className='shrink-0 text-center'>
						<img
							className='rounded-full border-4 border-uprophet-mint h-40 w-40 object-cover shadow-md mx-auto'
							src={profilePic.src || profilePic}
							alt='Isaiah Jenkins'
						/>
						<h3 className='text-gray-400 text-lg font-semibold mt-3 mb-1'>Isaiah Jenkins</h3>
						<p className='text-uprophet-mint text-sm italic'>Founder</p>
					</div>

					{/* Mission text */}
					<div className='flex-1 text-gray-700 leading-relaxed'>
						<h2 className='text-2xl font-bold text-uprophet-mint mb-3'>Our Mission</h2>
						<p className='text-base mb-4'>
							Uprophet was launched on August 1, 2015, with a singular vision: to create a sanctuary where the power of words could roam free. We&apos;ve built this space for those who find inspiration in the unexpected and strength in the shared human experience.
						</p>
						<p className='text-base mb-4'>
							Whether you&apos;re sharing a timeless classic or an original thought that just crossed your mind, Uprophet is your stage. We believe every voice has the potential to inspire, and every quote has the power to change a perspective.
						</p>
						<p className='text-base font-bold mt-4'>
							Express yourself. Share your journey. Be U.
						</p>
					</div>
				</div>

				<div className='mt-10 text-gray-400 text-xs pb-4'>
					<p>© 2026 Uprophet. Established 2015.</p>
				</div>
			</div>
		</section>
	);
};

export default About;
