import { join } from 'node:path';
import { findGreatestN, sumArray } from '../util/array';
import { processInput } from './shared';

export async function b(file: string) {
	const inputPath = join(__dirname, file);
	const totals = await processInput(inputPath);

	const greatest = findGreatestN(totals, 3);
	const answer = sumArray(greatest);
	return answer;
}
