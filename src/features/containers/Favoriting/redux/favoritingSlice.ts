import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FavoritingState {
	favoriting: any[];
	requestStatus?: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: FavoritingState = {
	favoriting: []
};

interface FavoritingData {
	url: string;
	username: string;
}

export const favoritingAsync = createAsyncThunk('favoriting/status', async (data: FavoritingData, { rejectWithValue }) => {
	const { url, username } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				username
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const favoritingSlice = createSlice({
	name: 'favoriting',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(favoritingAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(favoritingAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.requestStatus = 'fulfilled';
				state.favoriting = payload;
			})
			.addCase(favoritingAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.favoriting.requestStatus;
export const selectFavoriting = (state: any) => state.favoriting.favoriting;
export default favoritingSlice.reducer;
