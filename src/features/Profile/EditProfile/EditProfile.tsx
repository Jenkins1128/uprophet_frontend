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
import { Button } from '@/components/ui/button';
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
		<section className='pt-24 pb-8 px-2'>
			<h1 className='text-gray-400 font-semibold text-sm ml-4 mb-6'>Edit Profile</h1>

			{/* Photo section */}
			<div className='bg-white rounded-2xl px-6 py-8 mx-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 mb-6'>
				<form onSubmit={photoForm.handleSubmit(onPhotoSubmit)}>
					<figure className='flex flex-col items-center gap-4 m-0'>
						<Userphoto size='profile' username={userInfo?.currentUser || ''} />
						<figcaption className='text-center'>
							<label className='cursor-pointer'>
								<span className='text-sm font-bold text-uprophet-mint hover:text-green-700 transition-colors'>
									Change Photo
								</span>
								<input
									type='file'
									onChange={onPicChange}
									className='hidden'
									accept='image/*'
								/>
							</label>
							{photoForm.formState.errors.image && (
								<p className='text-xs text-red-500 mt-1'>{photoForm.formState.errors.image.message}</p>
							)}
						</figcaption>
						<Button
							type='submit'
							disabled={photoForm.formState.isSubmitting}
							className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
						>
							{photoForm.formState.isSubmitting ? 'Saving...' : 'Save Photo'}
						</Button>
					</figure>
				</form>
			</div>

			{/* Bio section */}
			<div className='bg-white rounded-2xl px-6 py-8 mx-3 lg:mx-24 md:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100'>
				<form className='flex flex-col items-center gap-4' onSubmit={bioForm.handleSubmit(onBioSubmit)}>
					<label className='text-sm font-semibold text-gray-500 self-start'>Bio</label>
					<textarea
						{...bioForm.register('bio')}
						placeholder={userInfo?.bio || 'Add a bio...'}
						rows={4}
						className={`w-full rounded-xl border bg-transparent p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-uprophet-mint transition ${bioForm.formState.errors.bio ? 'border-red-400 focus:ring-red-400' : 'border-gray-200'}`}
					/>
					{bioForm.formState.errors.bio && (
						<p className='text-xs text-red-500 self-start'>{bioForm.formState.errors.bio.message}</p>
					)}
					<Button
						type='submit'
						disabled={bioForm.formState.isSubmitting}
						className='bg-uprophet-mint hover:bg-uprophet-mint/80 text-gray-800 font-bold border border-gray-300 rounded-full px-8 transition-all hover:scale-105'
					>
						{bioForm.formState.isSubmitting ? 'Saving...' : 'Save Bio'}
					</Button>
				</form>
			</div>
		</section>
	);
};

export default EditProfile;
