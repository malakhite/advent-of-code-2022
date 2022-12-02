import { printStats } from '../util/logging';
import { a } from './a';
import { b } from './b';

(async function runA() {
	const answer = await a('input.txt');
	console.log(`Answer to part A: ${answer}`);

	printStats();
})();

(async function runB() {
	const answer = await b('input.txt');
	console.log(`Answer to part B: ${answer}`);

	printStats();
})();
