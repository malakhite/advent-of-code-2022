import { AbstractPuzzle } from '../types/Puzzle';
import { sumArray } from '../util/array';

export default class Day03Puzzle extends AbstractPuzzle {
	private lines: string[] = [];

	protected processInput(): void {
		this.lines = this.input.trim().split('\n');
	}

	private getItemPriority(item: string) {
		const utfCode = item.codePointAt(0)!;
		if (65 <= utfCode && utfCode <= 90) {
			return utfCode - 38;
		}
		if (97 <= utfCode && utfCode <= 122) {
			return utfCode - 96;
		}

		throw new Error(`No priority found for ${item}`);
	}

	public solveFirst() {
		const priorities: number[] = [];
		for (const line of this.lines) {
			let answer = '';
			const half = line.length / 2;
			const left = line.slice(0, half);
			const right = line.slice(half);
			for (const letter of left) {
				if (right.includes(letter)) {
					answer = letter;
					break;
				}
			}

			const priority = this.getItemPriority(answer);

			priorities.push(priority);
		}

		const total = sumArray(priorities);
		return total.toString();
	}

	public solveSecond() {
		const priorities: number[] = [];
		for (let i = 0; i < this.lines.length; i += 3) {
			const firstElf = this.lines[i];
			const secondElf = this.lines[i + 1];
			const thirdElf = this.lines[i + 2];
			let answer = '';
			for (const letter of firstElf) {
				if (secondElf.includes(letter) && thirdElf.includes(letter)) {
					answer = letter;
					break;
				}
			}

			const priority = this.getItemPriority(answer);
			priorities.push(priority);
		}

		const total = sumArray(priorities);
		return total.toString();
	}
}
