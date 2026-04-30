"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { useMutation } from '@tanstack/react-query';
import { changePasswordSignInRequest, changePasswordRequest } from '@/api/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	changePasswordStep1Schema,
	changePasswordStep2Schema,
	type ChangePasswordStep1FormData,
	type ChangePasswordStep2FormData
} from '@/validation/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChangePassword: React.FC = () => {
	const router = useRouter();
	const [username, setUsername] = useState<string>('');
	const [changePasswordForm, setChangePasswordForm] = useState<boolean>(false);
	const [isIncorrectError, setIsIncorrectError] = useState<boolean>(false);

	const step1Form = useForm<ChangePasswordStep1FormData>({
		resolver: zodResolver(changePasswordStep1Schema)
	});

	const step2Form = useForm<ChangePasswordStep2FormData>({
		resolver: zodResolver(changePasswordStep2Schema)
	});

	const { mutate: signIn } = useMutation({
		mutationFn: (credentials: ChangePasswordStep1FormData) => changePasswordSignInRequest(credentials),
		onSuccess: (_, variables) => {
			setUsername(variables.username);
			setChangePasswordForm(true);
		},
		onError: () => {
			setIsIncorrectError(true);
		}
	});

	const { mutate: changePass } = useMutation({
		mutationFn: (payload: { username: string; newPassword: string }) => changePasswordRequest(payload),
		onSuccess: () => {
			router.push('/signin');
		}
	});

	const onStep1Submit = (data: ChangePasswordStep1FormData) => {
		setIsIncorrectError(false);
		signIn(data);
	};

	const onStep2Submit = (data: ChangePasswordStep2FormData) => {
		changePass({ username, newPassword: data.newPassword });
	};

	return (
		<section className='pt-24 text-center'>
			<h1 className='text-gray-400 text-3xl font-normal mb-6'>Change Password?</h1>
			{!changePasswordForm ? (
				<article className='bg-white rounded-2xl px-10 py-8 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
					{isIncorrectError && (
						<div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
							<p className='text-sm text-red-600 font-medium'>Username or password is incorrect.</p>
						</div>
					)}
					<form className='flex flex-col gap-4' onSubmit={step1Form.handleSubmit(onStep1Submit)}>
						<fieldset id='change_password_signin' className='flex flex-col gap-3 border-none p-0 m-0'>
							<div>
								<Input
									{...step1Form.register('username')}
									className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${step1Form.formState.errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
									placeholder='Username'
									type='text'
									maxLength={20}
								/>
								{step1Form.formState.errors.username && <p className='text-xs text-red-500 mt-1'>{step1Form.formState.errors.username.message}</p>}
							</div>
							<div>
								<Input
									{...step1Form.register('password')}
									className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${step1Form.formState.errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
									placeholder='Password'
									type='password'
									maxLength={128}
								/>
								{step1Form.formState.errors.password && <p className='text-xs text-red-500 mt-1'>{step1Form.formState.errors.password.message}</p>}
							</div>
						</fieldset>
						<div className='mt-2'>
							<Button
								type='submit'
								className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
							>
								Sign In
							</Button>
						</div>
					</form>
				</article>
			) : (
				<ChangePasswordForm
					register={step2Form.register}
					errors={step2Form.formState.errors}
					handleSubmit={step2Form.handleSubmit}
					onSubmit={onStep2Submit}
				/>
			)}
		</section>
	);
};

export default ChangePassword;
