"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Loading from '@/components/ui/Loading/Loading';
import CheckEmailForm from './CheckEmailForm/CheckEmailForm';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordRequest } from '@/api/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/validation/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPassword: React.FC = () => {
	const [checkEmailForm, setCheckEmailForm] = useState<boolean>(false);
	const [isIncorrectError, setIsIncorrectError] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema)
	});

	const { mutate: forgotPass, isPending: isLoading } = useMutation({
		mutationFn: (payload: ForgotPasswordFormData) => forgotPasswordRequest(payload),
		onSuccess: () => {
			setCheckEmailForm(true);
		},
		onError: () => {
			setIsIncorrectError(true);
		}
	});

	const onSubmit = (data: ForgotPasswordFormData) => {
		setIsIncorrectError(false);
		forgotPass(data);
	};

	return (
		<section className='pt-24 text-center'>
			<h1 className='text-gray-400 text-3xl font-normal mb-6'>Forgot Password?</h1>
			{isLoading ? (
				<Loading />
			) : !checkEmailForm ? (
				<article className='bg-white rounded-2xl px-10 py-8 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
					{isIncorrectError && (
						<div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
							<p className='text-sm text-red-600 font-medium'>Username or email is incorrect.</p>
						</div>
					)}
					<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
						<fieldset id='forgot_password' className='flex flex-col gap-3 border-none p-0 m-0'>
							<div>
								<Input
									{...register('username')}
									className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
									placeholder='Username'
									type='text'
									maxLength={20}
								/>
								{errors.username && <p className='text-xs text-red-500 mt-1'>{errors.username.message}</p>}
							</div>
							<div>
								<Input
									{...register('email')}
									className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
									placeholder='Email'
									type='email'
									maxLength={100}
								/>
								{errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
							</div>
						</fieldset>
						<div className='mt-2'>
							<Button
								type='submit'
								className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
							>
								Submit
							</Button>
						</div>
					</form>
				</article>
			) : (
				<CheckEmailForm Link={Link} />
			)}
		</section>
	);
};

export default ForgotPassword;
