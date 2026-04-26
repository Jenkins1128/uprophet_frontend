import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NotificationCountState {
	notificationCount: number;
}

const initialState: NotificationCountState = {
	notificationCount: 0
};

export const getNotificationCountAsync = createAsyncThunk('getNotificationCount/status', async (url: string, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const getNotificationCountSlice = createSlice({
	name: 'getNotificationCount',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNotificationCountAsync.pending, () => {})
			.addCase(getNotificationCountAsync.fulfilled, (state, { payload }: PayloadAction<{ notificationCount: number }>) => {
				state.notificationCount = payload.notificationCount;
			})
			.addCase(getNotificationCountAsync.rejected, () => {});
	}
});

export const selectNotificationCount = (state: any) => state.notificationCount.notificationCount;
export default getNotificationCountSlice.reducer;
