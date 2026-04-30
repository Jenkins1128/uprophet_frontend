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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
		<section className='pt-24 text-center'>
			<h1 className='text-gray-400 text-2xl font-normal mb-6'>&quot;Focus on the now.&quot;</h1>
			<article className='bg-white rounded-2xl px-10 py-8 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
				{isIncorrectError && (
					<div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
						<p className='text-sm text-red-600 font-medium'>Username or password is incorrect.</p>
					</div>
				)}
				<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
					<fieldset id='sign_in' className='flex flex-col gap-4 border-none p-0 m-0'>
						<div>
							<Input
								{...register('username')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								maxLength={20}
								placeholder='Username'
								type='text'
							/>
							{errors.username && <p className='text-xs text-red-500 mt-1'>{errors.username.message}</p>}
						</div>
						<div>
							<Input
								{...register('password')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								maxLength={128}
								placeholder='Password'
								type='password'
							/>
							{errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
						</div>
					</fieldset>
					<div className='mt-2'>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</Button>
					</div>
					<div className='flex justify-between mt-2 px-4'>
						<Link href='/changepassword' className='no-underline font-bold text-uprophet-mint hover:text-green-700 text-xs transition-colors'>
							Change Password
						</Link>
						<Link href='/forgotpassword' className='no-underline font-bold text-uprophet-mint hover:text-green-700 text-xs transition-colors'>
							Forgot Password
						</Link>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signin;
