import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SearchState {
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
	results: any[];
}

const initialState: SearchState = {
	requestStatus: 'idle',
	results: []
};

interface SearchData {
	url: string;
	search: string;
}

export const searchAsync = createAsyncThunk('search/status', async (data: SearchData, { rejectWithValue }) => {
	const { url, search } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				search
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(searchAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.requestStatus = 'fulfilled';
				state.results = payload;
			})
			.addCase(searchAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.search.requestStatus;
export const selectResults = (state: any) => state.search.results;
export default searchSlice.reducer;
