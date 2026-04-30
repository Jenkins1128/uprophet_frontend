import { z } from 'zod';

export const signinSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be 20 characters or less'),
	name: z.string().min(1, 'Name is required').max(20, 'Name must be 20 characters or less'),
	email: z.string().email('Invalid email address').max(100, 'Email must be 100 characters or less'),
	password: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password must be 128 characters or less'),
	terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms',
	}),

});



export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	email: z.string().email('Invalid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const changePasswordStep1Schema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required'),
});

export const changePasswordStep2Schema = z
	.object({
		newPassword: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password must be 128 characters or less'),
		verifyPassword: z.string().min(1, 'Please verify your password'),
	})
	.refine((data) => data.newPassword === data.verifyPassword, {
		message: "Passwords don't match",
		path: ['verifyPassword'],
	});

export type ChangePasswordStep1FormData = z.infer<typeof changePasswordStep1Schema>;
export type ChangePasswordStep2FormData = z.infer<typeof changePasswordStep2Schema>;



