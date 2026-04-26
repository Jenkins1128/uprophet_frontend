import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { url } from '../../../domain';
import { useCurrentUser } from '../../../store/useCurrentUser';
import { loginAsync } from './redux/signinThunk';
import { AppDispatch } from '../../../app/store';

const Signin: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isIncorrectError, setIsIncorrectError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	

	useEffect(() => {
		if (currentUser) {
			router.push('/');
		}
	}, [history, currentUser]);

	const handleUsernameOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handlePasswordOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setPassword(value);
	};

	const submitLogin = (event: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
		event.preventDefault();
		if (username && password) {
			dispatch((loginAsync as any)({ url: `${url}/signin`, username, password })).then((res: any) => {
				if (res.meta.isUserSuccess) {
					router.push('/');
				} else {
					setIsIncorrectError(true);
				}
			});
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<section className='pt6 '>
			<h1 className='moon-gray f3'>"Focus on the now."</h1>
			<article className='br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
				{isIncorrectError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username or password is incorrect.</p>
					</div>
				)}
				{isEmptyError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please fill all the fields.</p>
					</div>
				)}
				<form className='measure center pa3 black-80'>
					<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' maxLength={20} placeholder='Username' type='text' onChange={handleUsernameOnchange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent w-75' maxLength={128} placeholder='Password' type='password' onChange={handlePasswordOnchange} />
						</div>
					</fieldset>
					<div className='lh-copy mt1'>
						<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={submitLogin}>
							Sign in
						</button>
					</div>
					<div className='flex justify-between mt3'>
						<Linkhref='/changepassword' className='no-underline b light-green hover-black grow pointer'>
							Change Password
						</Link>
						<Linkhref='/forgotpassword' className='no-underline b light-green hover-black grow pointer'>
							Forgot Password
						</Link>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signin;
