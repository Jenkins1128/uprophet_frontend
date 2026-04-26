import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpAsync } from './redux/signUpThunk';
import { loginAsync } from '../Signin/redux/signinThunk';
import { url } from '../../../domain';
import { getUserAsync, selectCurrentUser } from '../../presentationals/Header/redux/getUserSlice';
import { AppDispatch } from '../../../app/store';

const Signup: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const currentUser = useSelector(selectCurrentUser);

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [terms, setTerms] = useState(false);
	const [isExistsError, setIsExistsError] = useState(false);
	const [isTermsError, setIsTermsError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	useEffect(() => {
		dispatch((getUserAsync as any)(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			router.push('/');
		}
	}, [history, currentUser]);

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
		const { value } = event.target;
		setTerms(value === 'on' ? true : false);
	};

	const submitLogin = (usernameStr: string, passwordStr: string) => {
		dispatch((loginAsync as any)({ url: `${url}/signin`, username: usernameStr, password: passwordStr })).then((res: any) => {
			if (res.meta.requestStatus === 'fulfilled') {
				router.push('/');
			}
		});
	};

	const signup = (event: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
		event.preventDefault();
		if (username && name && password && email) {
			if (terms) {
				dispatch((signUpAsync as any)({ url: `${url}/signup`, name, username, password, email })).then((res: any) => {
					if (res.meta.requestStatus === 'fulfilled') {
						submitLogin(username, password);
					} else {
						setIsExistsError(true);
					}
				});
			} else {
				if (!terms) setIsTermsError(true);
			}
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<section className='pt6'>
			<h1 className='moon-gray f3'>Join Uprophet today!</h1>
			<article className='br2 pa5-l pa4-m pa3-nsba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
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
				<div className='measure pa3 black-80'>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Name' type='text' maxLength={20} onChange={onNameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' maxLength={20} onChange={onUsernameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Email' type='email' maxLength={100} onChange={onEmailChange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' maxLength={128} onChange={onPasswordChange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 ba br4 bg-transparent' type='radio' onChange={onTermsChange} />
							<p>I READ & UNDERSTAND the </p>
							<Linkhref='/terms' className='no-underline dark-green'>
								Terms of Uprophet.
							</Link>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={signup}>
							Sign up
						</button>
					</div>
				</div>
			</article>
		</section>
	);
}

export default Signup;
