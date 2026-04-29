"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signinRequest } from '@/api/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/validation/auth';

const Signin: React.FC = () => {
	const router = useRouter();
	const { isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const [isIncorrectError, setIsIncorrectError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema)
	});

	useEffect(() => {
		if (isUserSuccess && currentUser) {
			router.push('/');
		}
	}, [isUserSuccess, currentUser, router]);

	const { mutate: login } = useMutation({
		mutationFn: (data: SigninFormData) => signinRequest(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			router.push('/');
		},
		onError: () => {
			setIsIncorrectError(true);
		}
	});

	const onSubmit = (data: SigninFormData) => {
		setIsIncorrectError(false);
		login(data);
	};

	return (
		<section className='pt6 tc'>
			<h1 className='moon-gray f3'>&quot;Focus on the now.&quot;</h1>
			<article className='br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
				{isIncorrectError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username or password is incorrect.</p>
					</div>
				)}
				<form className='measure center pa3 black-80' onSubmit={handleSubmit(onSubmit)}>
					<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input
								{...register('username')}
								className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.username ? 'b--red' : ''}`}
								maxLength={20}
								placeholder='Username'
								type='text'
							/>
							{errors.username && <p className='f7 red mt1'>{errors.username.message}</p>}
						</div>
						<div className='mv3'>
							<input
								{...register('password')}
								className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.password ? 'b--red' : ''}`}
								maxLength={128}
								placeholder='Password'
								type='password'
							/>
							{errors.password && <p className='f7 red mt1'>{errors.password.message}</p>}
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<button
							className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib'
							type='submit'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
					<div className='flex justify-between mt4 ph3'>
						<Link href='/changepassword' className='no-underline b light-green hover-black grow pointer f7'>
							Change Password
						</Link>
						<Link href='/forgotpassword' className='no-underline b light-green hover-black grow pointer f7'>
							Forgot Password
						</Link>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signin;

