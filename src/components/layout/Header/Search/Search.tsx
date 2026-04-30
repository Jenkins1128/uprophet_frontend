"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input";

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
		<div className='mr-2 w-full max-w-[200px]'>
			<form onSubmit={submitSearch}>
				<Input 
					className='rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus-visible:ring-white h-9' 
					placeholder='Search' 
					onChange={onSearchChange} 
					type='text' 
					maxLength={20} 
				/>
			</form>
		</div>
	);
};

export default Search;
