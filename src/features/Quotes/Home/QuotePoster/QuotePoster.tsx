import React from 'react';

interface QuotePosterProps {
	postQuote: (event: React.FormEvent<HTMLFormElement>) => void;
	onQuoteChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuotePoster: React.FC<QuotePosterProps> = ({ postQuote, onQuoteChange, onTitleChange }) => {
	return (
		<article className='bg-near-white pa4 br4 w-75 mw6 shadow-5 center tc'>
			<form className='ph1 black-80' onSubmit={postQuote}>
				<fieldset id='sign_in' className='flex flex-column ba b--transparent ph0 mh0'>
					<div className='mt2'>
						<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75 center db' placeholder='Title' type='text' maxLength={20} onChange={onTitleChange} />
					</div>
					<div className='mt3 flex items-center justify-center'>
						<strong className='f2 mr2 moon-gray'>&quot;</strong>
						<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75' placeholder='Enter a quote. Quotation marks are set!' type='text' onChange={onQuoteChange} />
						<strong className='f2 ml2 moon-gray'>&quot;</strong>
					</div>
				</fieldset>
				<div className='lh-copy mt3'>
					<button className='b ph4 pv2 input-reset ba bw1 br4 b--black bg-light-green grow pointer f6 dib' type='submit'>
						Post
					</button>
				</div>
			</form>
		</article>
	);
};

export default QuotePoster;
