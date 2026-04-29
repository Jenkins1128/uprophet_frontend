"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const PleaseSignin: React.FC = () => {
	const router = useRouter();
	const pleaseSignin = () => {
		router.push('/signin');
	};

	return (
		<section className='mt6'>
			<h1 className='f3 light-green'>Session expired. Please sign in.</h1>
			<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={pleaseSignin}>
				Sign in
			</button>
		</section>
	);
};

export default PleaseSignin;
