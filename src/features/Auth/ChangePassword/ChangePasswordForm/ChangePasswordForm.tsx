import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { ChangePasswordStep2FormData } from '@/validation/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChangePasswordFormProps {
	register: UseFormRegister<ChangePasswordStep2FormData>;
	errors: FieldErrors<ChangePasswordStep2FormData>;
	handleSubmit: UseFormHandleSubmit<ChangePasswordStep2FormData>;
	onSubmit: (data: ChangePasswordStep2FormData) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ register, errors, handleSubmit, onSubmit }) => {
	return (
		<article className='bg-white rounded-2xl px-10 py-8 w-3/4 max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='change_password' className='flex flex-col gap-3 border-none p-0 m-0'>
					<div>
						<Input
							{...register('newPassword')}
							className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.newPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
							placeholder='New Password'
							type='password'
						/>
						{errors.newPassword && <p className='text-xs text-red-500 mt-1'>{errors.newPassword.message}</p>}
					</div>
					<div>
						<Input
							{...register('verifyPassword')}
							className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.verifyPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
							placeholder='Verify New Password'
							type='password'
						/>
						{errors.verifyPassword && <p className='text-xs text-red-500 mt-1'>{errors.verifyPassword.message}</p>}
					</div>
				</fieldset>
				<div className='mt-2'>
					<Button
						type='submit'
						className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
					>
						Change Password
					</Button>
				</div>
			</form>
		</article>
	);
};

export default ChangePasswordForm;
