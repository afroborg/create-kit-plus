import nodeAdapter from '@sveltejs/adapter-node';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';
import path from 'path';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: nodeAdapter({ out: 'build' }),
		vite: {
			resolve: {
				alias: {
					'@': path.resolve(__dirname, 'src')
				}
			}
		}
	}
};

export default config;
