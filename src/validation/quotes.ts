import { z } from 'zod';

export const createQuoteSchema = z.object({
	title: z.string().min(1, 'Title is required').max(20, 'Title must be 20 characters or less'),
	quote: z.string().min(1, 'Quote is required').max(500, 'Quote must be 500 characters or less'),
});

export type CreateQuoteFormData = z.infer<typeof createQuoteSchema>;

export const addCommentSchema = z.object({
	comment: z.string().min(1, 'Comment is required').max(500, 'Comment must be 500 characters or less'),
});

export type AddCommentFormData = z.infer<typeof addCommentSchema>;

