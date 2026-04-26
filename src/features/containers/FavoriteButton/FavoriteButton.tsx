"use client";
import React, { useEffect, useState } from 'react';
import { url } from '../../../domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

	const favorite = () => {
		performFavorite(username);
	};

	const unfavorite = () => {
		performUnfavorite(username);
	};

	return (
		<div>
			{!getDidFavorite ? (
				<button className='f6 button-reset bg-white ba b--black-10 grow pointer pv1 black-60' onClick={favorite}>
					Favorite
				</button>
			) : (
				<button className='f6 button-reset bg-white ba b--black-10 grow pointer pv1 black-60' onClick={unfavorite}>
					UnFavorite
				</button>
			)}
		</div>
	);
};

export default FavoriteButton;
