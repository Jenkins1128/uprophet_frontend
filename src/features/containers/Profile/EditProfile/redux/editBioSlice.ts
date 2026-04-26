import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface EditBioState {
	changeBioStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: EditBioState = {
	changeBioStatus: 'idle'
};

interface EditBioData {
	url: string;
	bio: string;
}

export const changeBioAsync = createAsyncThunk('changeBio/status', async (data: EditBioData, { rejectWithValue }) => {
	const { url, bio } = data;
	try {
		const response = await axios({
			url,
			method: 'PUT',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				bio
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const changeBioSlice = createSlice({
	name: 'changeBio',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(changeBioAsync.pending, (state) => {
				state.changeBioStatus = 'pending';
			})
			.addCase(changeBioAsync.fulfilled, (state) => {
				state.changeBioStatus = 'fulfilled';
			})
			.addCase(changeBioAsync.rejected, (state) => {
				state.changeBioStatus = 'rejected';
			});
	}
});

export const selectChangeBioStatus = (state: any) => state.changeBio.changeBioStatus;
export default changeBioSlice.reducer;
