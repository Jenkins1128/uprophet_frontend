import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrentUserInfoState {
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
	currentUserInfo: any;
}

const initialState: CurrentUserInfoState = {
	requestStatus: 'idle',
	currentUserInfo: {}
};

export const getCurrentUserInfoAsync = createAsyncThunk('currentUserInfo/status', async (url: string, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: '*/*' }
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const currentUserInfoSlice = createSlice({
	name: 'currentUserInfo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentUserInfoAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getCurrentUserInfoAsync.fulfilled, (state, { payload }: PayloadAction<any>) => {
				state.requestStatus = 'fulfilled';
				state.currentUserInfo = payload;
			})
			.addCase(getCurrentUserInfoAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.currentUserInfo.requestStatus;
export const selectCurrentUserInfo = (state: any) => state.currentUserInfo.currentUserInfo;
export default currentUserInfoSlice.reducer;
