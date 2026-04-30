import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { AddCommentFormData } from '@/validation/quotes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CommentPosterProps {
	register: UseFormRegister<AddCommentFormData>;
	errors: FieldErrors<AddCommentFormData>;
	handleSubmit: UseFormHandleSubmit<AddCommentFormData>;
	onSubmit: (data: AddCommentFormData) => void;
	isSubmitting: boolean;
}

const CommentPoster: React.FC<CommentPosterProps> = ({ register, errors, handleSubmit, onSubmit, isSubmitting }) => {
	return (
		<article className='bg-white rounded-2xl px-6 py-5 mx-3 my-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-center'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='comment_poster' className='flex flex-col border-none p-0 m-0'>
					<div className='mt-2'>
						<Input
							{...register('comment')}
							className={`rounded-full border-gray-300 bg-transparent w-3/4 mx-auto block ${errors.comment ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
							placeholder='Add a comment'
							type='text'
							maxLength={255}
						/>
						{errors.comment && <p className='text-xs text-red-500 mt-1'>{errors.comment.message}</p>}
					</div>
				</fieldset>
				<div className='mt-4'>
					<Button
						type='submit'
						disabled={isSubmitting}
						className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
					>
						{isSubmitting ? 'Posting...' : 'Post'}
					</Button>
				</div>
			</form>
		</article>
	);
};

export default CommentPoster;
