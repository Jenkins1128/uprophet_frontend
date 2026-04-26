import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NotificationsState {
	state: string;
	notifications: any[];
	requestStatus?: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: NotificationsState = {
	state: 'idle',
	notifications: []
};

export const getNotificationsAsync = createAsyncThunk('notifications/status', async (url: string, { rejectWithValue }) => {
	try {
		const response = await axios({
			url,
			method: 'GET',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' }
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNotificationsAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getNotificationsAsync.fulfilled, (state, { payload }: PayloadAction<any[]>) => {
				state.requestStatus = 'fulfilled';
				state.notifications = payload;
			})
			.addCase(getNotificationsAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
			});
	}
});

export const selectRequestStatus = (state: any) => state.notifications.requestStatus;
export const selectNotifications = (state: any) => state.notifications.notifications;
export default notificationsSlice.reducer;
