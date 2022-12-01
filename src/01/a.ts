import { join } from 'node:path';
import { findGreatestN, sumArray } from '../util/array';
import { processInput } from './shared';

export async function a(file: string) {
	const inputPath = join(__dirname, file);
	const totals = await processInput(inputPath);

	const greatest = findGreatestN(totals);
	const answer = sumArray(greatest);
	return answer;
}
