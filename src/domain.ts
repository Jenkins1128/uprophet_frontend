export const url: string =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api'
		: 'https://api.uprophet.com/api';
