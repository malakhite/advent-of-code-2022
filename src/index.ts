import * as dotenv from 'dotenv';
dotenv.config();

import PuzzleFactory from './util/PuzzleFactory';

const args = process.argv.slice(2);

const dayToSolve = args[0];

if (!dayToSolve) {
	console.error('No day specified. Run with `pnpm start {day}`.');
	process.exit(1);
}

console.log(`Solving Day #${dayToSolve}`);
(async () => {
	const puzzle = await PuzzleFactory.getPuzzle(dayToSolve);
	await puzzle.logResults();
})();
