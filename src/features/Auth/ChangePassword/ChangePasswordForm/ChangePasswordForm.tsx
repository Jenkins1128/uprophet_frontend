import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { ChangePasswordStep2FormData } from '@/validation/auth';

interface ChangePasswordFormProps {
	register: UseFormRegister<ChangePasswordStep2FormData>;
	errors: FieldErrors<ChangePasswordStep2FormData>;
	handleSubmit: UseFormHandleSubmit<ChangePasswordStep2FormData>;
	onSubmit: (data: ChangePasswordStep2FormData) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ register, errors, handleSubmit, onSubmit }) => {
	return (
		<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
			<form className='measure center pa3 black-80' onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='change_password' className='ba b--transparent ph0 mh0'>
					<div className='mv3'>
						<input
							{...register('newPassword')}
							className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.newPassword ? 'b--red' : ''}`}
							placeholder='New Password'
							type='password'
						/>
						{errors.newPassword && <p className='f7 red mt1'>{errors.newPassword.message}</p>}
					</div>
					<div className='mv3'>
						<input
							{...register('verifyPassword')}
							className={`b pa2 input-reset ba br4 bg-transparent w-75 center db ${errors.verifyPassword ? 'b--red' : ''}`}
							placeholder='Verify New Password'
							type='password'
						/>
						{errors.verifyPassword && <p className='f7 red mt1'>{errors.verifyPassword.message}</p>}
					</div>
				</fieldset>
				<div className='lh-copy mt3'>
					<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit'>
						Change Password
					</button>
				</div>
			</form>
		</article>
	);
};

export default ChangePasswordForm;

