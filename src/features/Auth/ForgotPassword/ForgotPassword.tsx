"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Loading from '@/components/ui/Loading/Loading';
import CheckEmailForm from './CheckEmailForm/CheckEmailForm';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordRequest } from '@/api/auth';
import type { ForgotPasswordPayload } from '@/types';

const ForgotPassword: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [checkEmailForm, setCheckEmailForm] = useState<boolean>(false);
	const [isIncorrectError, setIsIncorrectError] = useState<boolean>(false);
	const [isEmptyError, setIsEmptyError] = useState<boolean>(false);

	const { mutate: forgotPass, isPending: isLoading } = useMutation({
		mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordRequest(payload),
		onSuccess: () => {
			setCheckEmailForm(true);
		},
		onError: () => {
			setIsIncorrectError(true);
		}
	});

	const handleUsernameOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handleEmailOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	};

	const initCheckEmailForm = (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsIncorrectError(false);
		setIsEmptyError(false);
		if (username && email) {
			forgotPass({ username, email });
		} else {
			setIsEmptyError(true);
		}
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
					{isEmptyError && (
						<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
							<p className='f5 white'>Please fill all the fields.</p>
						</div>
					)}
					<form className='measure center pa3 black-80' onSubmit={initCheckEmailForm}>
						<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Username' type='text' maxLength={20} onChange={handleUsernameOnchange} />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Email' type='email' maxLength={100} onChange={handleEmailOnchange} />
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
