"use client";
import React, { useEffect, useState } from 'react';
import { url } from '../../../domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface FavoriteButtonProps {
	username: string;
	didFavorite: boolean;
}

const favoriteData = async (toUser: string) => {
	const { data } = await axios.post(`${url}/favorite`, { toUser }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const unfavoriteData = async (toUser: string) => {
	const { data } = await axios.post(`${url}/unfavorite`, { toUser }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ username, didFavorite }) => {
	const [getDidFavorite, setDidFavorite] = useState<boolean>(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		setDidFavorite(didFavorite);
	}, [didFavorite]);

	const { mutate: performFavorite } = useMutation({
		mutationFn: favoriteData,
		onSuccess: () => {
			setDidFavorite(true);
			queryClient.invalidateQueries({ queryKey: ['favoriters'] });
			queryClient.invalidateQueries({ queryKey: ['favoriting'] });
		}
	});

	const { mutate: performUnfavorite } = useMutation({
		mutationFn: unfavoriteData,
		onSuccess: () => {
			setDidFavorite(false);
			queryClient.invalidateQueries({ queryKey: ['favoriters'] });
			queryClient.invalidateQueries({ queryKey: ['favoriting'] });
		}
	});

	return (
		<div>
			{!getDidFavorite ? (
				<Button
					variant='outline'
					size='sm'
					className='rounded-full border-gray-300 text-gray-600 hover:bg-uprophet-mint hover:text-gray-800 hover:border-uprophet-mint transition-all'
					onClick={() => performFavorite(username)}
				>
					Favorite
				</Button>
			) : (
				<Button
					variant='outline'
					size='sm'
					className='rounded-full border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all'
					onClick={() => performUnfavorite(username)}
				>
					Unfavorite
				</Button>
			)}
		</div>
	);
};

export default FavoriteButton;
