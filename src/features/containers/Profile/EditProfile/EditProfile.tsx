import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Userphoto from '../../Userphoto/Userphoto';
import PleaseSignin from '../../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../../presentationals/Loading/Loading';
import { useCurrentUser } from '../../../../store/useCurrentUser';
import { getCurrentUserInfoAsync, selectCurrentUserInfo, selectRequestStatus } from './redux/currentUserInfoSlice';
import { changeBioAsync, selectChangeBioStatus } from './redux/editBioSlice';
import { changePhotoAsync, selectChangePhotoStatus } from './redux/editPhotoSlice';
import { url } from '../../../../domain';
import { AppDispatch } from '../../../../app/store';

const EditProfile: React.FC = () => {
	const [bio, setBio] = useState<string>('');
	const [imageData, setImageData] = useState<any>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading: isUserLoading, isSuccess: isUserSuccess, data: currentUser } = useCurrentUser();

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const changeBioStatus = useSelector(selectChangeBioStatus);
	const changePhotoStatus = useSelector(selectChangePhotoStatus);
	const userInfo = useSelector(selectCurrentUserInfo) as any;

	useEffect(() => {
		
	}, [dispatch, changePhotoStatus, changeBioStatus]);

	useEffect(() => {
		dispatch((getCurrentUserInfoAsync as any)(`${url}/currentUserInfo`));
	}, [dispatch, changePhotoStatus, changeBioStatus]);

	const savePhoto = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		(event.target as HTMLFormElement).reset();
		if (imageData) dispatch((changePhotoAsync as any)({ url: `${url}/uploadPic`, imageData }));
	};

	const saveBio = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		(event.target as HTMLFormElement).reset();
		dispatch((changeBioAsync as any)({ url: `${url}/savebio`, bio }));
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

	return (
		<>
			{requestStatus1 === 'pending' ? (
				<Loading />
			) : requestStatus1 === 'fulfilled' ? (
				requestStatus2 === 'pending' ? (
					<Loading />
				) : requestStatus2 === 'fulfilled' ? (
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
				) : (
					<PleaseSignin />
				)
			) : (
				<PleaseSignin />
			)}
		</>
	);
};

export default EditProfile;
