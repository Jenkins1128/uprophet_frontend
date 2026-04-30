import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { CreateQuoteFormData } from '@/validation/quotes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuotePosterProps {
	register: UseFormRegister<CreateQuoteFormData>;
	errors: FieldErrors<CreateQuoteFormData>;
	handleSubmit: UseFormHandleSubmit<CreateQuoteFormData>;
	onSubmit: (data: CreateQuoteFormData) => void;
	isSubmitting: boolean;
}

const QuotePoster: React.FC<QuotePosterProps> = ({ register, errors, handleSubmit, onSubmit, isSubmitting }) => {
	return (
		<article className='bg-white rounded-2xl px-8 py-6 w-3/4 max-w-xl mx-auto text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset id='post_quote' className='flex flex-col border-none p-0 m-0'>
					{/* Title input */}
					<div className='mt-2'>
						<Input
							{...register('title')}
							className={`rounded-full border-gray-300 bg-transparent mx-auto w-3/4 text-center ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
							placeholder='Title'
							type='text'
							maxLength={20}
						/>
						{errors.title && <p className='text-xs text-red-500 mt-1'>{errors.title.message}</p>}
					</div>

					{/* Quote input with decorative quotation marks */}
					<div className='mt-4 flex items-center justify-center gap-2'>
						<strong className='text-3xl text-gray-300 leading-none select-none'>&ldquo;</strong>
						<div className='w-3/4'>
							<Input
								{...register('quote')}
								className={`rounded-full border-gray-300 bg-transparent text-center ${errors.quote ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
								placeholder='Enter a quote. Quotation marks are set!'
								type='text'
							/>
							{errors.quote && <p className='text-xs text-red-500 mt-1'>{errors.quote.message}</p>}
						</div>
						<strong className='text-3xl text-gray-300 leading-none select-none'>&rdquo;</strong>
					</div>
				</fieldset>

				{/* Submit */}
				<div className='mt-5'>
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

export default QuotePoster;
