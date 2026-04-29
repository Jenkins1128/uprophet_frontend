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
		<section className='pt6 tc'>
			<h1 className='moon-gray f2 mb3'>Change Password?</h1>
			{!changePasswordForm ? (
				<div className='br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
					{isIncorrectError && (
						<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
							<p className='f5 white'>Username or password is incorrect.</p>
						</div>
					)}
					<form className='measure center pa3 black-80' onSubmit={step1Form.handleSubmit(onStep1Submit)}>
						<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input
									{...step1Form.register('username')}
									className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${step1Form.formState.errors.username ? 'b--red' : ''}`}
									placeholder='Username'
									type='text'
									maxLength={20}
								/>
								{step1Form.formState.errors.username && <p className='f7 red mt1'>{step1Form.formState.errors.username.message}</p>}
							</div>
							<div className='mv3'>
								<input
									{...step1Form.register('password')}
									className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${step1Form.formState.errors.password ? 'b--red' : ''}`}
									placeholder='Password'
									type='password'
									maxLength={128}
								/>
								{step1Form.formState.errors.password && <p className='f7 red mt1'>{step1Form.formState.errors.password.message}</p>}
							</div>
						</fieldset>
						<div className='lh-copy mt3'>
							<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit'>
								Sign In
							</button>
						</div>
					</form>
				</div>
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

