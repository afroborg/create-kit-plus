import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	return {
		status: 200,
		body: {
			status: 'OK'
		}
	};
};
