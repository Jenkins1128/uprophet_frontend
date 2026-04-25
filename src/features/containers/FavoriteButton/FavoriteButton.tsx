import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { url } from '../../../domain';
import { favoriteAsync, unfavoriteAsync } from './redux/favoriteButtonThunk';
import { AppDispatch } from '../../../app/store';

interface FavoriteButtonProps {
	username: string;
	didFavorite: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ username, didFavorite }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [getDidFavorite, setDidFavorite] = useState<boolean>(false);

	useEffect(() => {
		setDidFavorite(didFavorite);
	}, [didFavorite]);

	const favorite = () => {
		dispatch((favoriteAsync as any)({ url: `${url}/favorite`, toUser: username })).then((res: any) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setDidFavorite(true);
			}
		});
	};

	const unfavorite = () => {
		dispatch((unfavoriteAsync as any)({ url: `${url}/unfavorite`, toUser: username })).then((res: any) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setDidFavorite(false);
			}
		});
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
