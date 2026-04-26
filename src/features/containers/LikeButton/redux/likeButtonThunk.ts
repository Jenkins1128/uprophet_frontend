import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LikeData {
	url: string;
	quoteId: string | number;
}

export const likeAsync = createAsyncThunk('like/status', async (data: LikeData, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const unlikeAsync = createAsyncThunk('unlike/status', async (data: LikeData, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
