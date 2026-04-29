"use client";
import React from 'react';
import Userphoto from '../Userphoto/Userphoto';
import PleaseSignin from '@/components/ui/PleaseSignin/PleaseSignin';
import Loading from '@/components/ui/Loading/Loading';
import { useCurrentUser } from '@/store/useCurrentUser';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUserInfo, savePhotoRequest, saveBioRequest } from '@/api/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bioSchema, photoSchema, type BioFormData, type PhotoFormData } from '@/validation/user';
import Swal from 'sweetalert2';

const EditProfile: React.FC = () => {
	const { isLoading: isUserLoading, isSuccess: isUserSuccess } = useCurrentUser();
	const queryClient = useQueryClient();

	const bioForm = useForm<BioFormData>({
		resolver: zodResolver(bioSchema),
	});

	const photoForm = useForm<PhotoFormData>({
		resolver: zodResolver(photoSchema),
	});

	const { data: userInfo, isLoading: isUserInfoLoading } = useQuery({
		queryKey: ['currentUserInfo'],
		queryFn: fetchCurrentUserInfo,
		enabled: isUserSuccess,
	});

	const { mutate: updatePhoto } = useMutation({
		mutationFn: savePhotoRequest,
		onSuccess: () => {
			Swal.fire('Saved!', 'Your photo has been updated.', 'success');
			photoForm.reset();
			queryClient.invalidateQueries({ queryKey: ['currentUserInfo'] });
			queryClient.invalidateQueries({ queryKey: ['userPhoto', userInfo?.currentUser] });
		},
	});

	const { mutate: updateBio } = useMutation({
		mutationFn: saveBioRequest,
		onSuccess: () => {
			Swal.fire('Saved!', 'Your bio has been updated.', 'success');
			bioForm.reset();
			queryClient.invalidateQueries({ queryKey: ['currentUserInfo'] });
		},
	});

	const onPhotoSubmit: SubmitHandler<PhotoFormData> = (data) => {
		updatePhoto(data);
	};

	const onBioSubmit: SubmitHandler<BioFormData> = (data) => {
		updateBio(data.bio);
	};

	const onPicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files && files.length > 0) {
			const file = files[0];
			const name = file.name;
			const reader = new FileReader();

			reader.onload = function (e: ProgressEvent<FileReader>) {
				const result = e.target?.result as string;
				const getImage = result.split(',')[1];
				photoForm.setValue('name', name);
				photoForm.setValue('image', getImage);
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
			<form onSubmit={photoForm.handleSubmit(onPhotoSubmit)}>
				<figure className='flex flex-column items-center'>
					<Userphoto size='profile' username={userInfo?.currentUser || ''} />
					<figcaption>
						<input
							type='file'
							onChange={onPicChange}
							className='mt4 bg-transparent b--none pointer tc b light-green f5'
						/>
						{photoForm.formState.errors.image && (
							<p className='f7 red mt1 tc'>{photoForm.formState.errors.image.message}</p>
						)}
					</figcaption>
					<button
						className='bg-light-green pointer mt3 br-pill w4 h2'
						disabled={photoForm.formState.isSubmitting}
					>
						{photoForm.formState.isSubmitting ? 'Saving...' : 'Save'}
					</button>
				</figure>
			</form>
			<form className='mt5 flex flex-column items-center' onSubmit={bioForm.handleSubmit(onBioSubmit)}>
				<textarea
					{...bioForm.register('bio')}
					placeholder={userInfo?.bio || 'Add a bio...'}
					className={`db border-box hover-black w-100 measure ba pa2 br2 mb2 ${bioForm.formState.errors.bio ? 'b--red' : 'b--black-20'}`}
				/>
				{bioForm.formState.errors.bio && (
					<p className='f7 red mb2'>{bioForm.formState.errors.bio.message}</p>
				)}
				<button
					className='bg-light-green pointer mt3 br-pill w4 h2'
					disabled={bioForm.formState.isSubmitting}
				>
					{bioForm.formState.isSubmitting ? 'Saving...' : 'Save'}
				</button>
			</form>
		</section>
	);
};

export default EditProfile;

