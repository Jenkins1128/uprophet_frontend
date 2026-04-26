import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProfileState {
	profileQuotes: any[];
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: ProfileState = {
	profileQuotes: [],
	requestStatus: 'idle'
};

interface ProfileData {
	url: string;
	username: string;
}

export const profileAsync = createAsyncThunk('profile/status', async (data: ProfileData, { rejectWithValue }) => {
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

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(profileAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(profileAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.requestStatus = 'fulfilled';
				state.profileQuotes = payload;
			})
			.addCase(profileAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.profile.requestStatus;
export const selectProfileQuotes = (state: any) => state.profile.profileQuotes;
export default profileSlice.reducer;
