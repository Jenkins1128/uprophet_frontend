import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changePasswordAsync, changePasswordSignInAsync } from './redux/changePasswordThunk';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { url } from '../../../domain';
import { AppDispatch } from '../../../app/store';

const ChangePassword: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const history = useHistory();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [verifyPassword, setVerifyPassword] = useState<string>('');
	const [changePasswordForm, setChangePasswordForm] = useState<boolean>(false);

	const [isIncorrectError, setIsIncorrectError] = useState<boolean>(false);
	const [isIncorrectVerifyError, setIsIncorrectVerifyError] = useState<boolean>(false);
	const [isEmptyError1, setIsEmptyError1] = useState<boolean>(false);
	const [isEmptyError2, setIsEmptyError2] = useState<boolean>(false);

	const handleUsernameOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handlePasswordOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setPassword(value);
	};

	const handleNewPasswordOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setNewPassword(value);
	};

	const handleVerifyPasswordOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setVerifyPassword(value);
	};

	const initChangePasswordForm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (username && password) {
			dispatch((changePasswordSignInAsync as any)({ url: `${url}/changePasswordSignIn`, username, password })).then((res: any) => {
				if (res.meta.requestStatus === 'fulfilled') {
					setChangePasswordForm(true);
				} else {
					setIsIncorrectError(true);
				}
			});
		} else {
			setIsEmptyError1(true);
		}
	};

	const changePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (newPassword && verifyPassword) {
			if (newPassword === verifyPassword) {
				dispatch((changePasswordAsync as any)({ url: `${url}/changePassword`, username, newPassword })).then((res: any) => {
					if (res.meta.requestStatus === 'fulfilled') {
						history.push('/signin');
					}
				});
			} else {
				setIsIncorrectVerifyError(true);
			}
		} else {
			setIsEmptyError2(true);
		}
	};

	return (
		<section className='pt6 '>
			<h1 className='moon-gray'>Change Password?</h1>
			{!changePasswordForm ? (
				<div className='br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
					{isIncorrectError && (
						<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
							<p className='f5 white'>Username or password is incorrect.</p>
						</div>
					)}
					{isEmptyError1 && (
						<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
							<p className='f5 white'>Please fill all the fields.</p>
						</div>
					)}
					<form className='measure center pa3 black-80'>
						<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' maxLength={20} onChange={handleUsernameOnchange} />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' maxLength={128} onChange={handlePasswordOnchange} />
							</div>
						</fieldset>
						<div className='lh-copy mt1'>
							<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={initChangePasswordForm}>
								Sign In
							</button>
						</div>
					</form>
				</div>
			) : (
				<ChangePasswordForm
					handleNewPasswordOnchange={handleNewPasswordOnchange}
					handleVerifyPasswordOnchange={handleVerifyPasswordOnchange}
					isIncorrectVerifyError={isIncorrectVerifyError}
					isEmptyError2={isEmptyError2}
					changePassword={changePassword}
				/>
			)}
		</section>
	);
};

export default ChangePassword;
