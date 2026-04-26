import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ForgotPasswordData {
	url: string;
	username?: string;
	email?: string;
}

export const forgotPasswordAsync = createAsyncThunk('forgotPassword/status', async (data: ForgotPasswordData, { rejectWithValue }) => {
	const { url, username, email } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				email
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
