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
		<section className='pt6 tc'>
			<h1 className='moon-gray f2 mb3'>Forgot Password?</h1>
			{isLoading ? (
				<Loading />
			) : !checkEmailForm ? (
				<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
					{isIncorrectError && (
						<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
							<p className='f5 white'>Username or email is incorrect.</p>
						</div>
					)}
					<form className='measure center pa3 black-80' onSubmit={handleSubmit(onSubmit)}>
						<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input
									{...register('username')}
									className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.username ? 'b--red' : ''}`}
									placeholder='Username'
									type='text'
									maxLength={20}
								/>
								{errors.username && <p className='f7 red mt1'>{errors.username.message}</p>}
							</div>
							<div className='mv3'>
								<input
									{...register('email')}
									className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.email ? 'b--red' : ''}`}
									placeholder='Email'
									type='email'
									maxLength={100}
								/>
								{errors.email && <p className='f7 red mt1'>{errors.email.message}</p>}
							</div>
						</fieldset>
						<div className='lh-copy mt3'>
							<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit'>
								Submit
							</button>
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

