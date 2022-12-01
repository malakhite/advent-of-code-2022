import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { processInput } from './shared';

describe('processInput', () => {
	it('returns the expected values', async () => {
		const inputPath = join(__dirname, 'test.txt');
		const input = await processInput(inputPath);
		expect(input).toStrictEqual([6000, 4000, 11000, 24000, 10000]);
	});
});
