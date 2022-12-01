import { once } from 'node:events';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { sumArray } from '../util/array';

export async function processInput(file: string) {
	let currentElf: number[] = [];
	const totals: number[] = [];

	const rl = createInterface({
		input: createReadStream(file),
		crlfDelay: Infinity,
	});

	rl.on('line', async (line) => {
		if (line === '') {
			const total = sumArray(currentElf);
			totals.push(total);
			currentElf = [];
		} else {
			const parsedLine = parseInt(line, 10);
			if (Number.isNaN(parsedLine)) {
				throw new Error(`Something went wrong: ${line} is not a number.`);
			}
			currentElf.push(parsedLine);
		}
	});

	rl.on('close', () => {
		const finalElf = sumArray(currentElf);
		totals.push(finalElf);
	});

	await once(rl, 'close');

	return totals;
}
