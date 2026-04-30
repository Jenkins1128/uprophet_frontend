"use client";
import React from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QuotePost from '../../Quotes/QuotePost/QuotePost';
import Userphoto from '../Userphoto/Userphoto';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfileQuotes, fetchUserInfo } from '@/api/user';
import { deleteQuoteRequest } from '@/api/quotes';
import type { Quote, UserInfo } from '@/types';

const Profile: React.FC = () => {
	const { username } = useParams<{ username: string }>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const { data: profileQuotes = [], isLoading: isProfileLoading } = useQuery({
		queryKey: ['profileQuotes', username],
		queryFn: () => fetchProfileQuotes(username as string),
		enabled: isUserSuccess && !!username,
	});

	const { data: userInfo, isLoading: isUserInfoLoading } = useQuery({
		queryKey: ['userInfo', username],
		queryFn: () => fetchUserInfo(username as string),
		enabled: isUserSuccess && !!username,
	});

	const { mutate: removeQuote } = useMutation({
		mutationFn: deleteQuoteRequest,
		onSuccess: () => {
			Swal.fire('Deleted!', 'Your quote has been deleted.', 'success');
			queryClient.invalidateQueries({ queryKey: ['profileQuotes', username] });
		},
	});

	const deleteQuote = (quoteId: number | string) => {
		removeQuote(quoteId);
	};

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isProfileLoading || isUserInfoLoading) return <Loading />;

	return (
		<section className='pt-24 pb-8 px-2'>
			{/* Edit / Favorite action — top right only */}
			<div className='flex justify-end px-4 mb-4'>
				{userInfo?.currentUser === username ? (
					<Link
						href='/account/edit'
						className='no-underline text-sm font-semibold text-gray-500 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
					>
						Edit Profile
					</Link>
				) : (
					<div>{userInfo && <FavoriteButton username={username as string} didFavorite={userInfo.didFavorite} />}</div>
				)}
			</div>

			{/* Profile card: avatar | username + stats + bio */}
			<div className='bg-white rounded-2xl px-6 py-6 mx-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 mb-24'>
				<div className='flex items-start gap-6'>
					<Userphoto size='profile' username={username as string} />
					<div className='flex flex-col gap-2'>
						{/* Username above stats */}
						<h1 className='text-uprophet-mint font-bold text-xl m-0 leading-tight'>{username}</h1>
						{/* Stats row */}
						<div className='flex gap-6'>
							<span className='text-gray-500 font-bold text-sm'>{profileQuotes.length} quotes</span>
							<Link href={userInfo ? `/${username}/favoriters` : '#'} className='no-underline text-gray-500 font-bold text-sm hover:text-uprophet-mint transition-colors'>
								{userInfo?.favoriters} favoriters
							</Link>
							<Link href={userInfo ? `/${username}/favoriting` : '#'} className='no-underline text-gray-500 font-bold text-sm hover:text-uprophet-mint transition-colors'>
								{userInfo?.favoriting} favoriting
							</Link>
						</div>
						{/* Bio */}
						{userInfo?.bio && (
							<p className='text-gray-600 text-sm leading-relaxed max-w-sm mt-1'>{userInfo.bio}</p>
						)}
					</div>
				</div>
			</div>

			{/* Quote posts — no header, cleaner look */}
			<div>
				{profileQuotes.map((quote: Quote) => (
					<QuotePost
						key={quote.id}
						quoteId={quote.id}
						username={quote.userName}
						title={quote.title}
						quote={`"${quote.quote}"`}
						likeCount={quote.likeCount}
						didLike={quote.didLike}
						date={quote.datePosted}
						hasComments={true}
						canDelete={quote.userName === userInfo?.currentUser}
						deleteQuote={deleteQuote}
					/>
				))}
			</div>
		</section>
	);
}

export default Profile;
