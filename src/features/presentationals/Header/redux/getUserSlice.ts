import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface GetUserState {
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
	currentUser: string;
}

const initialState: GetUserState = {
	requestStatus: 'idle',
	currentUser: ''
};

export const getUserAsync = createAsyncThunk('getUser/status', async (url: string, { rejectWithValue }) => {
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

export const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	reducers: {
		clearCurrentUser: (state) => {
			state.currentUser = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserAsync.pending, (state) => {
				state.requestStatus = 'pending';
			})
			.addCase(getUserAsync.fulfilled, (state, { payload }: PayloadAction<string>) => {
				state.requestStatus = 'fulfilled';
				state.currentUser = payload;
			})
			.addCase(getUserAsync.rejected, (state) => {
				state.requestStatus = 'rejected';
				state.currentUser = '';
			});
	}
});

export const { clearCurrentUser } = getUserSlice.actions;
export const selectFirstRequestStatus = (state: any) => state.getUser.requestStatus;
export const selectCurrentUser = (state: any) => state.getUser.currentUser;
export default getUserSlice.reducer;
