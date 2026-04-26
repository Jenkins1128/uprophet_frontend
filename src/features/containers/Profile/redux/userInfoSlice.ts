import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserInfoState {
	userInfo: any;
}

const initialState: UserInfoState = {
	userInfo: {}
};

interface UserInfoData {
	url: string;
	username: string;
}

export const userInfoAsync = createAsyncThunk('userInfo/status', async (data: UserInfoData, { rejectWithValue }) => {
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

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userInfoAsync.pending, () => {})
			.addCase(userInfoAsync.fulfilled, (state, { payload }: PayloadAction<any>) => {
				state.userInfo = payload;
			})
			.addCase(userInfoAsync.rejected, (state) => {
				state.userInfo = {};
			});
	}
});

export const selectUserInfo = (state: any) => state.userInfo.userInfo;
export default userInfoSlice.reducer;
