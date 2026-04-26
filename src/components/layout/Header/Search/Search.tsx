"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search: React.FC = () => {
	const [searchtext, setSearchText] = useState<string>('');
	const router = useRouter();

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchText(value);
	};

	const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (searchtext.trim() !== '') {
			router.push(`/search/${searchtext}`);
			(event.target as HTMLFormElement).reset();
		}
	};

	return (
		<div className='mr2'>
			<form onSubmit={submitSearch}>
				<input className='pa2 input-reset ba br4 bw1 bg-transparent b--white w-100 ' placeholder='Search' onChange={onSearchChange} type='text' maxLength={20} />
			</form>
		</div>
	);
};

export default Search;
