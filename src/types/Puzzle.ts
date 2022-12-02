import { printSeparator } from '../util/logging';

export interface IPuzzle {
	solveFirst: () => string;
	solveSecond: () => string;
}

export abstract class AbstractPuzzle implements IPuzzle {
	protected input: string = '';

	public abstract solveFirst(): string;
	public abstract solveSecond(): string;

	protected abstract processInput(): void;

	public setInput(input: string) {
		this.input = input;
		this.processInput();
	}

	public async logResults(): Promise<void> {
		const first = this.solveFirst();
		const second = this.solveSecond();

		console.log(`Part 1 solution: ${first}`);
		console.log(`Part 2 solution: ${second}`);
		printSeparator();
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(`Memory used: ${Math.round(used * 100) / 1000} MB`);
	}
}
