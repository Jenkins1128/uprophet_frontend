import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ExploreQuotesState {
	exploreQuotes: any[];
}

const initialState: ExploreQuotesState = {
	exploreQuotes: []
};

export const getExploreQuotesAsync = createAsyncThunk('exploreQuotes/status', async (url: string, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response.data);
	}
});

export const exploreQuotesSlice = createSlice({
	name: 'exploreQuotes',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getExploreQuotesAsync.pending, () => {})
			.addCase(getExploreQuotesAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.exploreQuotes = payload;
			})
			.addCase(getExploreQuotesAsync.rejected, () => {});
	}
});

export const selectExploreQuotes = (state: any) => state.exploreQuotes.exploreQuotes;
export default exploreQuotesSlice.reducer;
