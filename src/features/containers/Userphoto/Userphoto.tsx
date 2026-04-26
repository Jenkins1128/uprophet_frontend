import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../../domain';
import Loading from '../../presentationals/Loading/Loading';
import { changePhotoStatusToIdle, selectChangePhotoStatus } from '../Profile/EditProfile/redux/editPhotoSlice';
import defaultProfilePic from '../../../images/defaultProfilePic.png';
import { userPhotoAsync } from './redux/userPhotoThunk';
import { AppDispatch } from '../../../app/store';

interface UserphotoProps {
	size?: string;
	username: string;
}

const Userphoto: React.FC<UserphotoProps> = ({ size, username }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [base64Img, setBase64Img] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const changePhotoStatus = useSelector(selectChangePhotoStatus);

	const mounted = useRef<boolean>(false);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatch((userPhotoAsync as any)({ url: `${url}/getPhoto`, username })).then((res: any) => {
			if (mounted.current) {
				setLoading(false);
			}
			if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
				setBase64Img(res.payload.photo);
			}
		});
	}, [dispatch, setLoading, username]);

	useEffect(() => {
		if (changePhotoStatus === 'fulfilled') {
			setLoading(true);
			dispatch((userPhotoAsync as any)({ url: `${url}/getPhoto`, username })).then((res: any) => {
				if (mounted.current) {
					setLoading(false);
				}
				if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
					setBase64Img(res.payload.photo);
					dispatch(changePhotoStatusToIdle());
				}
			});
		}
	}, [dispatch, setLoading, username, changePhotoStatus]);

	const getSize = () => {
		switch (size) {
			case 'header':
				return 'h2 w2';
			case 'profile':
				return 'h4 w4';
			default:
				return 'h3 w3';
		}
	};

	return loading ? <Loading isPhoto={true} size={size} /> : <img className={`br-100 ba bw1 b--white bg-white ${getSize()}`} src={base64Img ? `data:image;base64,${base64Img}` : defaultProfilePic} alt='UserPhoto' />;
};

export default Userphoto;
