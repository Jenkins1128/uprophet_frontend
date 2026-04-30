import React from 'react';

interface LoadingProps {
	isPhoto?: boolean;
	size?: 'header' | 'profile' | string;
}

const Loading: React.FC<LoadingProps> = ({ isPhoto, size }) => {
	const getSize = () => {
		switch (size) {
			case 'header':
				return 'h-8 w-8';
			case 'profile':
				return 'h-20 w-20';
			default:
				return 'h-12 w-12';
		}
	};

	return !isPhoto ? (
		<div className='flex justify-center pt-24'>
			<div className={`loader ${getSize()}`}></div>
		</div>
	) : (
		<div className={`loader ${getSize()} top-0`}></div>
	);
};

export default Loading;
