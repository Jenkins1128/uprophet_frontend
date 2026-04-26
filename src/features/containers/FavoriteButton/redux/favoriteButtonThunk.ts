import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FavoriteData {
	url: string;
	toUser: string;
}

export const favoriteAsync = createAsyncThunk('favorite/status', async (data: FavoriteData, { rejectWithValue }) => {
	const { url, toUser } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				toUser
			}
		});
		if (response.status >= 400 && response.status < 500) {
			throw new Error('400');
		}
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const unfavoriteAsync = createAsyncThunk('unfavorite/status', async (data: FavoriteData, { rejectWithValue }) => {
	const { url, toUser } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				toUser
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
