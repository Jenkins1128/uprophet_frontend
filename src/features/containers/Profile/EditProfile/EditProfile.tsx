"use client";
import React, { useState } from 'react';
import Userphoto from '../../Userphoto/Userphoto';
import PleaseSignin from '../../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../../presentationals/Loading/Loading';
import { useCurrentUser } from '../../../../store/useCurrentUser';
import { url } from '../../../../domain';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const fetchCurrentUserInfo = async () => {
	const { data } = await axios.get(`${url}/currentUserInfo`, {
		withCredentials: true,
		headers: { Accept: '*/*', 'Content-Type': 'application/json' },
	});
	return data;
};

const savePhotoData = async (imageData: any) => {
	const { data } = await axios.post(`${url}/uploadPic`, { imageData }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const saveBioData = async (bio: string) => {
	const { data } = await axios.post(`${url}/savebio`, { bio }, {
		withCredentials: true,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
	});
	return data;
};

const EditProfile: React.FC = () => {
	const [bio, setBio] = useState<string>('');
	const [imageData, setImageData] = useState<any>(null);
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();

	const { data: userInfo = {}, isLoading: isUserInfoLoading } = useQuery({
		queryKey: ['currentUserInfo'],
		queryFn: fetchCurrentUserInfo,
		enabled: isUserSuccess,
	});

	const { mutate: updatePhoto } = useMutation({
		mutationFn: savePhotoData,
		onSuccess: () => {
			Swal.fire('Saved!', 'Your photo has been updated.', 'success');
			queryClient.invalidateQueries({ queryKey: ['currentUserInfo'] });
		},
	});

	const { mutate: updateBio } = useMutation({
		mutationFn: saveBioData,
		onSuccess: () => {
			Swal.fire('Saved!', 'Your bio has been updated.', 'success');
			queryClient.invalidateQueries({ queryKey: ['currentUserInfo'] });
		},
	});

	const savePhoto = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		(event.target as HTMLFormElement).reset();
		if (imageData) updatePhoto(imageData);
	};

	const saveBio = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		(event.target as HTMLFormElement).reset();
		updateBio(bio);
	};

	const onBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = event.target;
		setBio(value);
	};

	const onPicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files && files.length > 0) {
			const file = files[0];
			const name = file.name;

			const reader = new FileReader();

			reader.onload = function (e: any) {
				const { result } = e.target;
				const getImage = result.split(',')[1];
				setImageData({ name: name, image: getImage });
			};

			reader.readAsDataURL(file);
		}
	};

	if (isUserLoading) return <Loading />;
	if (!isUserSuccess) return <PleaseSignin />;
	if (isUserInfoLoading) return <Loading />;

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Edit Profile</h1>
			<form onSubmit={savePhoto}>
				<figure className='flex flex-column items-center'>
					<Userphoto size='profile' username={userInfo?.currentUser || ''} />
					<figcaption>
						<input type='file' onChange={onPicChange} className='mt4 bg-transparent b--none pointer tc b light-green f5' />
					</figcaption>
					<button className='bg-light-green pointer mt3 br-pill w4 h2'>Save</button>
				</figure>
			</form>
			<form className='mt5 flex flex-column items-center' onSubmit={saveBio}>
				<textarea placeholder={userInfo?.bio || ''} onChange={onBioChange} className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' />
				<button className='bg-light-green pointer mt3 br-pill w4 h2'>Save</button>
			</form>
		</section>
	);
};

export default EditProfile;
