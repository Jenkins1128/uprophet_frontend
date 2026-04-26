import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface QuoteCommentsState {
	status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
	latestComments: any[];
}

const initialState: QuoteCommentsState = {
	status: 'idle',
	latestComments: []
};

interface GetCommentsData {
	url: string;
	quoteId: string | number;
}

export const getCommentsAsync = createAsyncThunk('getComments/status', async (data: GetCommentsData, { rejectWithValue }) => {
	const { url, quoteId } = data;
	let errorCode: number | undefined;
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
		return response.data;
	} catch (err: any) {
		return rejectWithValue([errorCode]);
	}
});

export const getCommentsSlice = createSlice({
	name: 'getComments',
	initialState,
	reducers: {
		updateQuoteComment: (state, { payload }: PayloadAction<any[]>) => {
			state.latestComments = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCommentsAsync.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getCommentsAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.status = 'fulfilled';
				state.latestComments = payload;
			})
			.addCase(getCommentsAsync.rejected, (state) => {
				state.status = 'rejected';
			});
	}
});

export const { updateQuoteComment } = getCommentsSlice.actions;
export const selectLatestComments = (state: any) => state.comments.latestComments;
export const selectSecondRequestStatus = (state: any) => state.comments.status;
export default getCommentsSlice.reducer;
