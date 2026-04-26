import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DeleteQuoteData {
	url: string;
	quoteId: string | number;
}

export const deleteQuoteAsync = createAsyncThunk('deleteQuote/status', async (data: DeleteQuoteData, { rejectWithValue }) => {
	const { url, quoteId } = data;
	try {
		const response = await axios({
			url,
			method: 'DELETE',
			withCredentials: true,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			data: {
				quoteId
			}
		});
		return response.status;
	} catch (err: any) {
		return rejectWithValue(err.response?.data);
	}
});
