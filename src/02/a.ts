import { once } from 'node:events';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { sumArray } from '../util/array';

const Play = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
};

const TheirTurn = {
	A: Play.ROCK,
	B: Play.PAPER,
	C: Play.SCISSORS,
};

const MyTurn = {
	X: Play.ROCK,
	Y: Play.PAPER,
	Z: Play.SCISSORS,
};

const ResultScores = {
	WIN: 6,
	DRAW: 3,
	LOSE: 0,
};

export async function processInput(file: string) {
	const scores: number[] = [];
	const rl = createInterface({
		input: createReadStream(file),
		crlfDelay: Infinity,
	});

	rl.on('line', async (line) => {
		const [them, me] = line.split(/\s+/) as [
			keyof typeof TheirTurn,
			keyof typeof MyTurn,
		];
		let score = MyTurn[me];

		switch (true) {
			case TheirTurn[them] === MyTurn[me]:
				score += ResultScores.DRAW;
				break;

			case TheirTurn[them] === Play.SCISSORS && MyTurn[me] === Play.ROCK:
				score += ResultScores.WIN;
				break;

			case TheirTurn[them] === Play.ROCK && MyTurn[me] === Play.SCISSORS:
				score += ResultScores.LOSE;
				break;

			case TheirTurn[them] > MyTurn[me]:
				score += ResultScores.LOSE;
				break;

			default:
				score += ResultScores.WIN;
		}

		scores.push(score);
	});

	await once(rl, 'close');

	return sumArray(scores);
}

export async function a(file: string) {
	const inputPath = join(__dirname, file);
	const score = await processInput(inputPath);

	return score;
}
