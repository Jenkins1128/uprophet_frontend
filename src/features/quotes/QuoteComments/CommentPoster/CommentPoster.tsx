import React from 'react';

interface CommentPosterProps {
	postComment: (event: React.FormEvent<HTMLFormElement>) => void;
	onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentPoster: React.FC<CommentPosterProps> = ({ postComment, onCommentChange }) => {
	return (
		<article className='bg-near-white pa4 br4 w-75 mw6 shadow-5 center tc'>
			<form className='ph1 black-80' onSubmit={postComment}>
				<fieldset id='comment_poster' className='flex flex-column ba b--transparent ph0 mh0'>
					<div className='mt3'>
						<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75 center db' placeholder='Add a comment' type='text' maxLength={255} onChange={onCommentChange} />
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

export default CommentPoster;
