import React from 'react';

const Terms: React.FC = () => {
	return (
		<section className='pt-24 text-center px-4 pb-12'>
			<h1 className='text-gray-400 text-3xl font-normal mb-8'>Terms of Service</h1>
			<div className='max-w-2xl mx-auto text-left bg-white px-8 py-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-700 leading-relaxed'>
				<p className='text-sm mb-6 italic text-gray-500'>Effective Date: April 26, 2026</p>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>1. Welcome to Uprophet</h2>
				<p className='text-sm mb-6'>
					Uprophet is a social platform designed for free expression through the power of words and quotes. By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy.
				</p>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>2. User Content and Ownership</h2>
				<p className='text-sm mb-6'>
					We believe in the ownership of your creative expression. You retain all intellectual property rights to the quotes and content you post on Uprophet. By sharing content, you grant Uprophet a non-exclusive, royalty-free, worldwide license to host, display, and distribute your content within the platform.
				</p>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>3. Community Guidelines</h2>
				<div className='text-sm mb-6'>
					While we encourage free expression, we strive to maintain a respectful environment. Users are prohibited from posting content that:
					<ul className='list-none pl-4 mt-2 space-y-1'>
						<li className='mb-1'>• Is unlawful, harmful, or threatening.</li>
						<li className='mb-1'>• Constitutes harassment or promotes hate speech.</li>
						<li className='mb-1'>• Infringes on the intellectual property of others.</li>
						<li className='mb-1'>• Contains spam or unauthorized commercial solicitations.</li>
					</ul>
				</div>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>4. Account Responsibility</h2>
				<p className='text-sm mb-6'>
					You must be at least 13 years of age to use Uprophet. You are responsible for maintaining the security of your account and password. Uprophet cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
				</p>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>5. Service Modifications</h2>
				<p className='text-sm mb-6'>
					We reserve the right to modify or terminate the service for any reason, without notice at any time. We also reserve the right to remove content and accounts containing content that we determine in our sole discretion are unlawful or violate these Terms.
				</p>

				<h2 className='text-lg font-bold text-uprophet-mint mb-2'>6. Limitation of Liability</h2>
				<p className='text-sm mb-6'>
					Uprophet is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties regarding the accuracy or reliability of content posted by users. In no event shall Uprophet be liable for any direct, indirect, or incidental damages resulting from your use of the service.
				</p>

				<div className='mt-6 pt-4 border-t border-gray-100 text-center'>
					<p className='text-xs text-gray-400'>
						Thank you for being part of the Uprophet community. Be inspired and be you.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Terms;
