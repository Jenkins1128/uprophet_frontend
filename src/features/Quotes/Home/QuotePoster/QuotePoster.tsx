import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { CreateQuoteFormData } from '@/validation/quotes';

interface QuotePosterProps {
	register: UseFormRegister<CreateQuoteFormData>;
	errors: FieldErrors<CreateQuoteFormData>;
	handleSubmit: UseFormHandleSubmit<CreateQuoteFormData>;
	onSubmit: (data: CreateQuoteFormData) => void;
	isSubmitting: boolean;
}

const QuotePoster: React.FC<QuotePosterProps> = ({ register, errors, handleSubmit, onSubmit, isSubmitting }) => {
	return (
		<article className='bg-near-white pa4 br4 w-75 mw6 shadow-5 center tc'>
			<form className='ph1 black-80' onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='post_quote' className='flex flex-column ba b--transparent ph0 mh0'>
					<div className='mt2'>
						<input
							{...register('title')}
							className={`pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75 center db ${errors.title ? 'b--red' : ''}`}
							placeholder='Title'
							type='text'
							maxLength={20}
						/>
						{errors.title && <p className='f7 red mt1'>{errors.title.message}</p>}
					</div>
					<div className='mt3 flex items-center justify-center'>
						<strong className='f2 mr2 moon-gray'>&quot;</strong>
						<div className='w-75'>
							<input
								{...register('quote')}
								className={`pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-100 ${errors.quote ? 'b--red' : ''}`}
								placeholder='Enter a quote. Quotation marks are set!'
								type='text'
							/>
							{errors.quote && <p className='f7 red mt1'>{errors.quote.message}</p>}
						</div>
						<strong className='f2 ml2 moon-gray'>&quot;</strong>
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

export default QuotePoster;

