import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserPhotoData {
	url: string;
	username: string;
}

export const userPhotoAsync = createAsyncThunk('userPhoto/status', async (data: UserPhotoData, { rejectWithValue }) => {
	const { url, username } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				username
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
