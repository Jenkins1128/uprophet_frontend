import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostQuoteState {
	newQuote: any;
}

const initialState: PostQuoteState = {
	newQuote: {}
};

interface PostQuoteData {
	url: string;
	title: string;
	quote: string;
}

export const postQuoteAsync = createAsyncThunk('postQuote/status', async (data: PostQuoteData, { rejectWithValue }) => {
	const { url, title, quote } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				title,
				quote
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const postQuoteSlice = createSlice({
	name: 'postQuote',
	initialState,
	reducers: {
		clearAddedQuote: (state) => {
			state.newQuote = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postQuoteAsync.pending, () => {})
			.addCase(postQuoteAsync.fulfilled, (state, { payload }: PayloadAction<any>) => {
				state.newQuote = payload;
			})
			.addCase(postQuoteAsync.rejected, () => {});
	}
});

export const { clearAddedQuote } = postQuoteSlice.actions;
export const selectNewQuote = (state: any) => state.postQuote.newQuote;
export default postQuoteSlice.reducer;
