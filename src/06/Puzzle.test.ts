import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { beforeAll, describe, expect, it } from 'vitest';
import Puzzle from './Puzzle';
import { AbstractPuzzle } from '../types/Puzzle';

describe('Day 06', () => {
	let puzzle: AbstractPuzzle;

	beforeAll(async () => {
		const inputPath = join(__dirname, 'test.txt');
		const input = await readFile(inputPath, 'utf-8');

		puzzle = new Puzzle();

		await puzzle.setInput(input);
	});

	it('part one', () => {
		const answer = puzzle.solveFirst();
		expect(answer).toEqual('10');
	});

	it('part two', () => {
		const answer = puzzle.solveSecond();
		expect(answer).toEqual('29');
	});
});
