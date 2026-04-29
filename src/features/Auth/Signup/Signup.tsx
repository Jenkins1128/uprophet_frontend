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
		<section className='pt6 tc'>
			<h1 className='moon-gray f3'>Join Uprophet today!</h1>
			<article className='br2 pa5-l pa4-m pa3-ns ba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
				{isExistsError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username already exists.</p>
					</div>
				)}
				<form className='measure center pa3 black-80' onSubmit={handleSubmit(onSubmit)}>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input
								{...register('name')}
								className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.name ? 'b--red' : ''}`}
								placeholder='Name'
								type='text'
							/>
							{errors.name && <p className='f7 red mt1'>{errors.name.message}</p>}
						</div>
						<div className='mt3'>
							<input
								{...register('username')}
								className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.username ? 'b--red' : ''}`}
								placeholder='Username'
								type='text'
							/>
							{errors.username && <p className='f7 red mt1'>{errors.username.message}</p>}
						</div>
						<div className='mt3'>
							<input
								{...register('email')}
								className={`pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.email ? 'b--red' : ''}`}
								placeholder='Email'
								type='email'
							/>
							{errors.email && <p className='f7 red mt1'>{errors.email.message}</p>}
						</div>
						<div className='mv3'>
							<input
								{...register('password')}
								className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.password ? 'b--red' : ''}`}
								placeholder='Password'
								type='password'
							/>
							{errors.password && <p className='f7 red mt1'>{errors.password.message}</p>}
						</div>
						<div className='mv4'>
							<input
								{...register('terms')}
								className='b pa2 ba br4 bg-transparent center db pointer'
								type='checkbox'
							/>
							<div className='mt2'>
								<p className='f7 mb1'>I READ & UNDERSTAND the </p>
								<Link href='/terms' className='no-underline f7 b light-green hover-black grow pointer'>
									Terms of Uprophet.
								</Link>
								{errors.terms && <p className='f7 red mt1'>{errors.terms.message}</p>}
							</div>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<button
							className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib'
							type='submit'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing up...' : 'Sign up'}
						</button>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signup;

