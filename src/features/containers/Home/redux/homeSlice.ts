import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface HomeState {
	latestQuotes: any[];
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: HomeState = {
	latestQuotes: [],
	requestStatus: 'idle'
};

export const homeAsync = createAsyncThunk('home/status', async (url: string, { rejectWithValue }) => {
	let errorCode: number | undefined;
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		if (response.status > 400 && response.status < 500) {
			errorCode = response.status;
		}
		return response.data;
	} catch (err: any) {
		return rejectWithValue([errorCode]);
	}
});

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		updateLatestQuotes: (state, { payload }: PayloadAction<any[]>) => {
			state.latestQuotes = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(homeAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(homeAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.latestQuotes = payload;
				state.requestStatus = 'fulfilled';
			})
			.addCase(homeAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const { updateLatestQuotes } = homeSlice.actions;
export const selectLatestQuotes = (state: any) => state.home.latestQuotes;
export const selectSecondRequestStatus = (state: any) => state.home.requestStatus;

export default homeSlice.reducer;
