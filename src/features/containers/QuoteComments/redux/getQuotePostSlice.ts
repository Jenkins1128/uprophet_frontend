import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface GetQuotePostState {
	quotePost: any;
}

const initialState: GetQuotePostState = {
	quotePost: {}
};

interface GetQuotePostData {
	url: string;
	quoteId: string | number;
}

export const getQuotePostAsync = createAsyncThunk('getQuotePost/status', async (data: GetQuotePostData, { rejectWithValue }) => {
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
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const getQuotePostSlice = createSlice({
	name: 'getQuotePost',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getQuotePostAsync.pending, () => {})
			.addCase(getQuotePostAsync.fulfilled, (state, { payload }: PayloadAction<any>) => {
				state.quotePost = payload;
			})
			.addCase(getQuotePostAsync.rejected, () => {});
	}
});

export const selectQuotePost = (state: any) => state.quotePost.quotePost;
export default getQuotePostSlice.reducer;
