import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChangePasswordData {
	url: string;
	username?: string;
	newPassword?: string;
	password?: string;
}

export const changePasswordAsync = createAsyncThunk('changePassword/status', async (data: ChangePasswordData, { rejectWithValue }) => {
	const { url, username, newPassword } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password: newPassword
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const changePasswordSignInAsync = createAsyncThunk('changePasswordSignIn/status', async (data: ChangePasswordData, { rejectWithValue }) => {
	const { url, username, password } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { 'Content-Type': 'application/json' },
			data: {
				username,
				password
			}
		});
		if (response.status === 401) {
			throw new Error(response.status.toString());
		}
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
