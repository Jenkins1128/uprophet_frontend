"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const PleaseSignin: React.FC = () => {
	const router = useRouter();
	const pleaseSignin = () => {
		router.push('/signin');
	};

	return (
		<section className='pt-24 text-center'>
			<h1 className='text-uprophet-mint text-2xl font-semibold mb-6'>Session expired. Please sign in.</h1>
			<Button
				type='button'
				onClick={pleaseSignin}
				className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
			>
				Sign in
			</Button>
		</section>
	);
};

export default PleaseSignin;
