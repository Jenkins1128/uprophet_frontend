import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostCommentState {
	addedComment: any;
}

const initialState: PostCommentState = {
	addedComment: {}
};

interface PostCommentData {
	url: string;
	quoteId: string | number;
	comment: string;
}

export const postCommentAsync = createAsyncThunk('postComment/status', async (data: PostCommentData, { rejectWithValue }) => {
	const { url, quoteId, comment } = data;
	try {
		const response = await axios({
			url,
			method: 'POST',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId,
				comment
			}
		});
		return response.data;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});

export const postCommentSlice = createSlice({
	name: 'postComment',
	initialState,
	reducers: {
		clearAddedComment: (state) => {
			state.addedComment = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postCommentAsync.pending, () => {})
			.addCase(postCommentAsync.fulfilled, (state, { payload }: PayloadAction<any>) => {
				state.addedComment = payload;
			})
			.addCase(postCommentAsync.rejected, () => {});
	}
});

export const { clearAddedComment } = postCommentSlice.actions;
export const selectAddedComment = (state: any) => state.postComment.addedComment;
export default postCommentSlice.reducer;
