import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FavoritersState {
	favoriters: any[];
	requestStatus?: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: FavoritersState = {
	favoriters: []
};

interface FavoritersData {
	url: string;
	username: string;
}

export const favoritersAsync = createAsyncThunk('favoriters/status', async (data: FavoritersData, { rejectWithValue }) => {
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

export const favoritersSlice = createSlice({
	name: 'favoriters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(favoritersAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(favoritersAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.requestStatus = 'fulfilled';
				state.favoriters = payload;
			})
			.addCase(favoritersAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.favoriters.requestStatus;
export const selectFavoriters = (state: any) => state.favoriters.favoriters;
export default favoritersSlice.reducer;
