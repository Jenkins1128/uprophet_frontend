"use client";
import React from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QuotePost from '../../quotes/QuotePost/QuotePost';
import Userphoto from '../Userphoto/Userphoto';
import PleaseSignin from '../../../components/ui/PleaseSignin/PleaseSignin';
import Loading from '../../../components/ui/Loading/Loading';
import { useCurrentUser } from '../../../store/useCurrentUser';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { url } from '../../../domain';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchProfileQuotes = async (username: string) => {
	const { data } = await axios.post(`${url}/profile`, { username }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const fetchUserInfo = async (username: string) => {
	const { data } = await axios.post(`${url}/userInfo`, { username }, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const deleteQuoteData = async (quoteId: number | string) => {
	const { data } = await axios.delete(`${url}/deleteQuote`, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		data: { quoteId }, // axios delete requires data field for body
	});
	return data;
};

const Profile: React.FC = () => {
	const { username } = useParams<{ username: string }>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const { data: profileQuotes = [], isLoading: isProfileLoading } = useQuery({
		queryKey: ['profileQuotes', username],
		queryFn: () => fetchProfileQuotes(username as string),
		enabled: isUserSuccess && !!username,
	});

	const { data: userInfo = {}, isLoading: isUserInfoLoading } = useQuery({
		queryKey: ['userInfo', username],
		queryFn: () => fetchUserInfo(username as string),
		enabled: isUserSuccess && !!username,
	});

	const { mutate: removeQuote } = useMutation({
		mutationFn: deleteQuoteData,
		onSuccess: () => {
			Swal.fire('Deleted!', 'Your quote has been deleted.', 'success');
			queryClient.invalidateQueries({ queryKey: ['profileQuotes', username] });
		},
	});

	const deleteQuote = (quoteId: number | string) => {
		removeQuote(quoteId);
	};

	const isEmpty = (obj: any) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isProfileLoading || isUserInfoLoading) return <Loading />;

	return (
		<section className='flex flex-column mt6 mh2 f7'>
			<h1 className='flex ml3 light-green'>{username}</h1>
			{userInfo.currentUser === username ? (
				<Link href='/account/edit' className='self-end w-10 b--none no-underline br3 bg-white moon-gray grow pointer:hover: pointer'>
					Edit Profile
				</Link>
			) : (
				<div className='self-end'>{!isEmpty(userInfo) && <FavoriteButton username={username as string} didFavorite={userInfo.didFavorite} />}</div>
			)}

			<div className='flex justify-center mt4'>
				<Userphoto size={'profile'} username={username as string} />
				<div className='flex flex-column'>
					<div className='flex mt4'>
						<p className='ml3 mt0 moon-gray b f5-l f6-m'>{profileQuotes.length} quotes</p>
						<Link href={!isEmpty(userInfo) ? `/${username}/favoriters` : '#'} className='ml4 no-underline moon-gray b f5-l f6-m'>
							{userInfo.favoriters} favoriters
						</Link>
						<Link href={!isEmpty(userInfo) ? `/${username}/favoriting` : '#'} className='ml4 no-underline moon-gray b f5-l f6-m'>
							{userInfo.favoriting} favoriting
						</Link>
					</div>
					<div className='mt3'>
						<p className='measure tc'>{userInfo.bio}</p>
					</div>
				</div>
			</div>
			<div className=' mt3'>
				<h1 className='flex pl6-l pl5-m light-green'>Quotes</h1>
				{profileQuotes.map((quote: any) => {
					return (
						<QuotePost
							key={quote.id}
							quoteId={quote.id}
							username={quote.user_name}
							title={quote.title}
							quote={`"${quote.quote}"`}
							likeCount={quote.likeCount}
							didLike={quote.didLike}
							date={quote.date_posted}
							hasComments={true}
							canDelete={quote.user_name === currentUser ? true : false}
							deleteQuote={deleteQuote}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Profile;
