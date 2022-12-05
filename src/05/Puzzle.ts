import clone from 'just-clone';
import { AbstractPuzzle } from '../types/Puzzle';

export default class Day05Puzzle extends AbstractPuzzle {
	private arrangement: string[][] = [[]];
	private instructions: [number, number, number][] = [];

	private isInstruction(
		maybeInstruction: number[],
	): maybeInstruction is [number, number, number] {
		if (maybeInstruction.length !== 3) {
			return false;
		}
		for (const el of maybeInstruction) {
			if (typeof el !== 'number') {
				return false;
			}
		}
		return true;
	}

	protected processInput(): void {
		let arrangementDone = false;
		const lines = this.input.split('\n');
		for (const line of lines) {
			if (line === '') arrangementDone = true;
			if (!arrangementDone) {
				for (let i = 1; i < line.length; i += 4) {
					if (!Number.isNaN(Number.parseInt(line[i], 10))) break;
					const arrangementIndex = Math.ceil(i / 4);

					if (!Array.isArray(this.arrangement[arrangementIndex])) {
						this.arrangement[arrangementIndex] = [];
					}

					if (line[i] !== ' ') {
						this.arrangement[arrangementIndex].unshift(line[i]);
					}
				}
			} else {
				if (line !== '') {
					const instruction = [...line.matchAll(/\d+/g)].map((match) =>
						Number.parseInt(match[0], 10),
					);
					if (this.isInstruction(instruction)) {
						this.instructions.push(instruction);
					} else {
						throw new Error(`${instruction} is not a valid instruction.`);
					}
				}
			}
		}
	}

	public solveFirst() {
		const localArrangement = clone(this.arrangement);
		for (const instruction of this.instructions) {
			const [count, target, destination] = instruction;
			for (let i = 0; i < count; i++) {
				const container = localArrangement[target].pop()!;
				localArrangement[destination].push(container);
			}
		}

		const topContainers = localArrangement
			.map((column) => column[column.length - 1])
			.join('');
		return topContainers;
	}

	public solveSecond() {
		const localArrangement = clone(this.arrangement);
		for (const instruction of this.instructions) {
			const [count, target, destination] = instruction;

			const containers = localArrangement[target].splice(-count);
			localArrangement[destination] =
				localArrangement[destination].concat(containers);
		}

		const topContainers = localArrangement
			.map((column) => column[column.length - 1])
			.join('');
		return topContainers;
	}
}
