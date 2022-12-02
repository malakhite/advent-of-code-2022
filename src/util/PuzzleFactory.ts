import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { AbstractPuzzle } from '../types/Puzzle';

class PuzzleFactory {
	public async getPuzzle(day: string) {
		const paddedDay = day.length < 2 ? `0${day}` : day;
		const puzzlePath = join(__dirname, '..', paddedDay);
		let input = '';

		try {
			const inputPath = join(puzzlePath, 'input.txt');
			input = await readFile(inputPath, 'utf-8');
		} catch (e) {
			console.error(e);
		}

		const puzzleModule: { default: { new (): AbstractPuzzle } } = await import(
			`../${paddedDay}/Puzzle`
		);

		const { default: puzzleClass } = puzzleModule;

		const puzzle = new puzzleClass();
		await puzzle.setInput(input);
		return puzzle;
	}
}

export default new PuzzleFactory();
