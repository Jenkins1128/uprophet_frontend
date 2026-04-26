import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignInData {
	url: string;
	username?: string;
	password?: string;
}

export const loginAsync = createAsyncThunk('signin/status', async (data: SignInData, { rejectWithValue }) => {
	const { url, username, password } = data;
	try {
		const response = await axios({
			url,
			method: 'PUT',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password
			}
		});
		if (response.status >= 400 && response.status < 500) {
			throw new Error(response.status.toString());
		}
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
