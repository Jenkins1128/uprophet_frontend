import React from 'react';

const Terms: React.FC = () => {
	return (
		<section className='pt6 tc ph3'>
			<h1 className='moon-gray f2 mb4'>Terms of Service</h1>
			<div className='measure-wide center tl bg-near-white pa4 br4 shadow-5 black-80 lh-copy'>
				<p className='f6 mb4 i'>
					Effective Date: April 26, 2026
				</p>

				<h2 className='f4 light-green mb2'>1. Welcome to Uprophet</h2>
				<p className='f6 mb4'>
					Uprophet is a social platform designed for free expression through the power of words and quotes. By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy.
				</p>
				
				<h2 className='f4 light-green mb2'>2. User Content and Ownership</h2>
				<p className='f6 mb4'>
					We believe in the ownership of your creative expression. You retain all intellectual property rights to the quotes and content you post on Uprophet. By sharing content, you grant Uprophet a non-exclusive, royalty-free, worldwide license to host, display, and distribute your content within the platform.
				</p>

				<h2 className='f4 light-green mb2'>3. Community Guidelines</h2>
				<div className='f6 mb4'>
					While we encourage free expression, we strive to maintain a respectful environment. Users are prohibited from posting content that:
					<ul className='list pl3 mt2'>
						<li className='mb1'>• Is unlawful, harmful, or threatening.</li>
						<li className='mb1'>• Constitutes harassment or promotes hate speech.</li>
						<li className='mb1'>• Infringes on the intellectual property of others.</li>
						<li className='mb1'>• Contains spam or unauthorized commercial solicitations.</li>
					</ul>
				</div>

				<h2 className='f4 light-green mb2'>4. Account Responsibility</h2>
				<p className='f6 mb4'>
					You must be at least 13 years of age to use Uprophet. You are responsible for maintaining the security of your account and password. Uprophet cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
				</p>

				<h2 className='f4 light-green mb2'>5. Service Modifications</h2>
				<p className='f6 mb4'>
					We reserve the right to modify or terminate the service for any reason, without notice at any time. We also reserve the right to remove content and accounts containing content that we determine in our sole discretion are unlawful or violate these Terms.
				</p>

				<h2 className='f4 light-green mb2'>6. Limitation of Liability</h2>
				<p className='f6 mb4'>
					Uprophet is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties regarding the accuracy or reliability of content posted by users. In no event shall Uprophet be liable for any direct, indirect, or incidental damages resulting from your use of the service.
				</p>

				<div className='mt4 pt3 bt b--light-gray tc'>
					<p className='f7 gray'>
						Thank you for being part of the Uprophet community. Be inspired and be you.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Terms;
