import React from 'react';
import { Button } from '@/components/ui/button';

interface CheckEmailFormProps {
	Link: React.ElementType;
}

const CheckEmailForm: React.FC<CheckEmailFormProps> = ({ Link }) => {
	return (
		<article className='bg-white rounded-2xl px-10 py-10 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-center flex flex-col items-center gap-4'>
			<h2 className='text-gray-400 text-lg font-medium'>Check your email for a temporary password.</h2>
			<Link href='/changepassword'>
				<Button className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 w-full transition-all hover:scale-105'>
					Change Password
				</Button>
			</Link>
			<Link href='/signin'>
				<Button className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 w-full transition-all hover:scale-105'>
					Sign In
				</Button>
			</Link>
		</article>
	);
};

export default CheckEmailForm;
