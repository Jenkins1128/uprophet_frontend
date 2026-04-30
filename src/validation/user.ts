import { z } from 'zod';

export const bioSchema = z.object({
	bio: z.string().max(1000, 'Bio must be 1000 characters or less'),
});

export const photoSchema = z.object({
	name: z.string().min(1, 'File name is required'),
	image: z.string().min(1, 'Image data is required'),
});

export type BioFormData = z.infer<typeof bioSchema>;
export type PhotoFormData = z.infer<typeof photoSchema>;
