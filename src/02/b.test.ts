import { describe, expect, it } from 'vitest';
import { b } from './b';

describe('b', () => {
	it('returns correct answer', async () => {
		const answer = await b('test.txt');
		expect(answer).toBe(12);
	});
});
