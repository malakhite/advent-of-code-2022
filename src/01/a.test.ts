import { describe, expect, it } from 'vitest';
import { a } from './a';

describe('a', () => {
	it('returns correct answer', async () => {
		const answer = await a('test.txt');
		expect(answer).toBe(24000);
	});
});
