import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { AddCommentFormData } from '@/validation/quotes';

interface CommentPosterProps {
	register: UseFormRegister<AddCommentFormData>;
	errors: FieldErrors<AddCommentFormData>;
	handleSubmit: UseFormHandleSubmit<AddCommentFormData>;
	onSubmit: (data: AddCommentFormData) => void;
	isSubmitting: boolean;
}

const CommentPoster: React.FC<CommentPosterProps> = ({ register, errors, handleSubmit, onSubmit, isSubmitting }) => {
	return (
		<article className='bg-near-white pa4 br4 w-75 mw6 shadow-5 center tc'>
			<form className='ph1 black-80' onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='comment_poster' className='flex flex-column ba b--transparent ph0 mh0'>
					<div className='mt3'>
						<input
							{...register('comment')}
							className={`pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75 center db ${errors.comment ? 'b--red' : ''}`}
							placeholder='Add a comment'
							type='text'
							maxLength={255}
						/>
						{errors.comment && <p className='f7 red mt1'>{errors.comment.message}</p>}
					</div>
				</fieldset>
				<div className='lh-copy mt3'>
					<button
						className='b ph4 pv2 input-reset ba bw1 br4 b--black bg-light-green grow pointer f6 dib'
						type='submit'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Posting...' : 'Post'}
					</button>
				</div>
			</form>
		</article>
	);
};

export default CommentPoster;

