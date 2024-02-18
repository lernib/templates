import node from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const loadJSON = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url)));

const pkg = loadJSON('./package.json');

export default {
	input: 'src/index.ts',
	output:{
		file: 'dist/index.js',
		format: 'cjs'
	},
	plugins: [
		node({
			ignoreGlobal: false,
			include: ['node_modules/**'],
			skip: Object.keys(pkg.dependencies || {})
		}),
		typescript()
	]
};
