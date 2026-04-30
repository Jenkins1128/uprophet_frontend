"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signupRequest, signinRequest } from '@/api/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '@/validation/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Signup: React.FC = () => {
	const { isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [isExistsError, setIsExistsError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			terms: false
		}
	});

	useEffect(() => {
		if (isUserSuccess && currentUser) {
			router.push('/');
		}
	}, [isUserSuccess, currentUser, router]);

	const { mutate: login } = useMutation({
		mutationFn: (credentials: { username: string; password: string }) => signinRequest(credentials),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			router.push('/');
		}
	});

	const { mutate: registerUser } = useMutation({
		mutationFn: (data: SignupFormData) => signupRequest(data),
		onSuccess: (_, variables) => {
			login({ username: variables.username, password: variables.password });
		},
		onError: () => {
			setIsExistsError(true);
		}
	});

	const onSubmit: SubmitHandler<SignupFormData> = (data) => {
		setIsExistsError(false);
		registerUser(data);
	};

	return (
		<section className='pt-24 text-center'>
			<h1 className='text-gray-400 text-2xl font-normal mb-6'>Join Uprophet today!</h1>
			<article className='bg-white rounded-2xl px-10 py-8 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 mb-8'>
				{isExistsError && (
					<div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
						<p className='text-sm text-red-600 font-medium'>Username already exists.</p>
					</div>
				)}
				<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
					<fieldset id='sign_up' className='flex flex-col gap-3 border-none p-0 m-0'>
						<div>
							<Input
								{...register('name')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								placeholder='Name'
								type='text'
							/>
							{errors.name && <p className='text-xs text-red-500 mt-1'>{errors.name.message}</p>}
						</div>
						<div>
							<Input
								{...register('username')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								placeholder='Username'
								type='text'
							/>
							{errors.username && <p className='text-xs text-red-500 mt-1'>{errors.username.message}</p>}
						</div>
						<div>
							<Input
								{...register('email')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								placeholder='Email'
								type='email'
							/>
							{errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
						</div>
						<div>
							<Input
								{...register('password')}
								className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								placeholder='Password'
								type='password'
							/>
							{errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
						</div>
						<div className='mt-2'>
							<input
								{...register('terms')}
								className='cursor-pointer accent-uprophet-mint'
								type='checkbox'
							/>
							<div className='mt-2'>
								<p className='text-xs text-gray-600 mb-1'>I READ &amp; UNDERSTAND the</p>
								<Link href='/terms' className='no-underline font-bold text-uprophet-mint hover:text-green-700 text-xs transition-colors'>
									Terms of Uprophet.
								</Link>
								{errors.terms && <p className='text-xs text-red-500 mt-1'>{errors.terms.message}</p>}
							</div>
						</div>
					</fieldset>
					<div className='mt-2'>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
						>
							{isSubmitting ? 'Signing up...' : 'Sign up'}
						</Button>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signup;
