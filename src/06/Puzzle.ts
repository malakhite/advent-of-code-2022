import { AbstractPuzzle } from '../types/Puzzle';

export default class Day06Puzzle extends AbstractPuzzle {
	protected processInput(): void {
		this.input = this.input.trim();
	}

	public solveFirst() {
		let doubles = 0;

		const values: Record<string, number> = {};

		for (let i = 0; i < this.input.length; i++) {
			const current = this.input[i];
			values[current] ? (values[current] += 1) : (values[current] = 1);

			if (values[current] > 1) {
				doubles += 1;
			}

			if (i > 3) {
				const first = this.input[i - 4];
				if (values[first] > 1) {
					doubles -= 1;
				}
				values[first] -= 1;

				if (doubles === 0) return (i + 1).toString();
			}
		}
		return 'failed';
	}

	public solveSecond() {
		let doubles = 0;

		const values: Record<string, number> = {};

		for (let i = 0; i < this.input.length; i++) {
			const current = this.input[i];
			values[current] ? (values[current] += 1) : (values[current] = 1);

			if (values[current] > 1) {
				doubles += 1;
			}

			if (i > 13) {
				const first = this.input[i - 14];
				if (values[first] > 1) {
					doubles -= 1;
				}
				values[first] -= 1;

				if (doubles === 0) return (i + 1).toString();
			}
		}
		return 'failed';
	}
}
