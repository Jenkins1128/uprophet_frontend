"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { url } from '../../../domain';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const signupData = async ({ name, username, password, email }: any) => {
	const { data } = await axios.post(`${url}/signup`, { name, username, password, email }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const signinData = async ({ username, password }: any) => {
	const { data } = await axios.post(`${url}/signin`, { username, password }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const Signup: React.FC = () => {
	const { isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [terms, setTerms] = useState(false);
	const [isExistsError, setIsExistsError] = useState(false);
	const [isTermsError, setIsTermsError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	useEffect(() => {
		if (isUserSuccess && currentUser) {
			router.push('/');
		}
	}, [isUserSuccess, currentUser, router]);

	const { mutate: login } = useMutation({
		mutationFn: signinData,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			router.push('/');
		}
	});

	const { mutate: register } = useMutation({
		mutationFn: signupData,
		onSuccess: () => {
			login({ username, password });
		},
		onError: () => {
			setIsExistsError(true);
		}
	});

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setName(value);
	};

	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUsername(value);
	};

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	};

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setPassword(value);
	};

	const onTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTerms(event.target.checked);
	};

	const signup = (event: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
		event.preventDefault();
		setIsExistsError(false);
		setIsTermsError(false);
		setIsEmptyError(false);
		if (username && name && password && email) {
			if (terms) {
				register({ name, username, password, email });
			} else {
				setIsTermsError(true);
			}
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<section className='pt6 tc'>
			<h1 className='moon-gray f3'>Join Uprophet today!</h1>
			<article className='br2 pa5-l pa4-m pa3-ns ba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
				{isExistsError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username already exists.</p>
					</div>
				)}
				{isTermsError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please accept terms.</p>
					</div>
				)}
				{isEmptyError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please fill all the fields.</p>
					</div>
				)}
				<form className='measure center pa3 black-80' onSubmit={signup}>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Name' type='text' maxLength={20} onChange={onNameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Username' type='text' maxLength={20} onChange={onUsernameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Email' type='email' maxLength={100} onChange={onEmailChange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent w-75 center db' placeholder='Password' type='password' maxLength={128} onChange={onPasswordChange} />
						</div>
						<div className='mv4'>
							<input className='b pa2 ba br4 bg-transparent center db pointer' type='checkbox' onChange={onTermsChange} />
							<div className='mt2'>
								<p className='f7 mb1'>I READ & UNDERSTAND the </p>
								<Link href='/terms' className='no-underline f7 b light-green hover-black grow pointer'>
									Terms of Uprophet.
								</Link>
							</div>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit'>
							Sign up
						</button>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signup;
