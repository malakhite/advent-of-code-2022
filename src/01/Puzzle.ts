import { AbstractPuzzle } from '../types/Puzzle';
import { findGreatestN, sumArray } from '../util/array';

export default class Day1Puzzle extends AbstractPuzzle {
	private lines: string[] = [];
	private totals: number[] = [];

	protected processInput(): void {
		this.lines = this.input.split('\n');

		let currentElf: number[] = [];

		this.lines.forEach((line) => {
			if (line === '') {
				const total = sumArray(currentElf);
				this.totals.push(total);
				currentElf = [];
			} else {
				const parsedLine = parseInt(line, 10);
				if (Number.isNaN(parsedLine)) {
					throw new Error(`Something when wrong: ${line} is not a number`);
				}
				currentElf.push(parsedLine);
			}
		});
	}

	public solveFirst() {
		const [greatest] = findGreatestN(this.totals);

		return greatest.toString();
	}

	public solveSecond() {
		const greatest = findGreatestN(this.totals, 3);
		const answer = sumArray(greatest);

		return answer.toString();
	}
}
