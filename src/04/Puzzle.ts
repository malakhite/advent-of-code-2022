import { AbstractPuzzle } from '../types/Puzzle';

export default class Day04Puzzle extends AbstractPuzzle {
	/**
	 * [min, max, min, max]
	 */
	private pairs: [number, number, number, number][] = [];

	private isValidSections(
		maybeSections: number[],
	): maybeSections is [number, number, number, number] {
		if (!(maybeSections.length === 4)) {
			return false;
		}
		for (const section of maybeSections) {
			if (typeof section !== 'number' || Number.isNaN(section)) {
				return false;
			}
		}
		return true;
	}

	protected processInput(): void {
		this.input
			.trim()
			.split('\n')
			.forEach((line) => {
				if (line === '') return;
				const sections = line
					.split(/\D/)
					.map((section) => Number.parseInt(section, 10));
				if (!this.isValidSections(sections)) {
					throw new Error(`Something is wrong with ${sections}`);
				}
				this.pairs.push(sections);
			});
	}

	public solveFirst() {
		let containedPairs = 0;
		this.pairs.forEach((pair) => {
			if (pair[0] <= pair[2] && pair[1] >= pair[3]) {
				containedPairs++;
			} else if (pair[0] >= pair[2] && pair[1] <= pair[3]) {
				containedPairs++;
			}
		});

		return containedPairs.toString();
	}

	public solveSecond() {
		let overlappingPairs = 0;
		this.pairs.forEach((pair) => {
			if (
				(pair[0] <= pair[2] && pair[1] >= pair[2]) ||
				(pair[0] <= pair[3] && pair[1] >= pair[3])
			) {
				overlappingPairs++;
			} else if (
				(pair[2] <= pair[0] && pair[3] >= pair[0]) ||
				(pair[2] <= pair[1] && pair[3] >= pair[1])
			) {
				overlappingPairs++;
			}
		});

		return overlappingPairs.toString();
	}
}
