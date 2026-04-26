import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface EditPhotoState {
	changePhotoStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: EditPhotoState = {
	changePhotoStatus: 'idle'
};

interface ImageData {
	name: string;
	image: string;
}

interface EditPhotoData {
	url: string;
	imageData: ImageData;
}

export const changePhotoAsync = createAsyncThunk('changePhoto/status', async (data: EditPhotoData, { rejectWithValue }) => {
	const { url, imageData } = data;
	const { name, image } = imageData;

	try {
		const response = await axios({
			url,
			method: 'PUT',
			withCredentials: true,
			headers: { Accept: '*/*', 'Content-Type': 'application/json' },
			data: {
				name,
				image
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const changePhotoSlice = createSlice({
	name: 'changePhoto',
	initialState,
	reducers: {
		changePhotoStatusToIdle: (state) => {
			state.changePhotoStatus = 'idle';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(changePhotoAsync.pending, (state) => {
				state.changePhotoStatus = 'pending';
			})
			.addCase(changePhotoAsync.fulfilled, (state) => {
				state.changePhotoStatus = 'fulfilled';
			})
			.addCase(changePhotoAsync.rejected, (state) => {
				state.changePhotoStatus = 'rejected';
			});
	}
});

export const { changePhotoStatusToIdle } = changePhotoSlice.actions;
export const selectChangePhotoStatus = (state: any) => state.changePhoto.changePhotoStatus;
export default changePhotoSlice.reducer;
