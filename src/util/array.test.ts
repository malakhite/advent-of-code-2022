import { describe, expect, it } from 'vitest';
import { sumArray } from './array';

describe('sumArray', () => {
	it('correctly sums single element array', () => {
		const answer = sumArray([10000]);
		expect(answer).to.equal(10000);
	});

	it('correctly sums multiple element arrays', () => {
		const answer = sumArray([1, 1, 1, 1]);
		expect(answer).to.equal(4);
	});
});
