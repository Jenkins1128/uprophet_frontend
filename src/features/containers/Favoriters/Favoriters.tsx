import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import { favoritersAsync, selectFavoriters, selectRequestStatus } from './redux/favoritersSlice';
import { url } from '../../../domain';
import { useCurrentUser } from '../../../store/useCurrentUser';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';
import { AppDispatch } from '../../../app/store';

const Favoriters: React.FC = () => {
	const { username } = useParams<{ username: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const favoriters = useSelector(selectFavoriters) as any[];
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);

	

	useEffect(() => {
		dispatch((favoritersAsync as any)({ url: `${url}/favoriters`, username }));
	}, [dispatch, username]);

	return requestStatus1 === 'fulfilled' ? (
		requestStatus2 === 'fulfilled' ? (
			<section className='mt6 mh2 f7'>
				<h1 className='flex ml4 moon-gray'>Favoriters</h1>
				<div className='mt5'>
					{favoriters.length > 0 &&
						favoriters.map((favoriter, i) => {
							return <FavoritersCard key={i} currentUser={favoriter.currentUser} username={favoriter.from_user} didFavorite={favoriter.didFavorite} />;
						})}
				</div>
			</section>
		) : requestStatus2 === 'pending' ? (
			<Loading />
		) : (
			<PleaseSignin />
		)
	) : requestStatus1 === 'pending' ? (
		<Loading />
	) : (
		<PleaseSignin />
	);
};

export default Favoriters;
