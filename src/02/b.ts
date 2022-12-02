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

const ResultScores = {
	WIN: 6,
	DRAW: 3,
	LOSE: 0,
};

const MyTurn = {
	X: ResultScores.LOSE,
	Y: ResultScores.DRAW,
	Z: ResultScores.WIN,
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

		if (MyTurn[me] === ResultScores.WIN) {
			if (TheirTurn[them] === Play.ROCK) {
				score += Play.PAPER;
			} else if (TheirTurn[them] === Play.PAPER) {
				score += Play.SCISSORS;
			} else {
				score += Play.ROCK;
			}
		} else if (MyTurn[me] === ResultScores.LOSE) {
			if (TheirTurn[them] === Play.ROCK) {
				score += Play.SCISSORS;
			} else if (TheirTurn[them] === Play.PAPER) {
				score += Play.ROCK;
			} else {
				score += Play.PAPER;
			}
		} else {
			score += TheirTurn[them];
		}

		scores.push(score);
	});

	await once(rl, 'close');

	return sumArray(scores);
}

export async function b(file: string) {
	const inputPath = join(__dirname, file);
	const score = await processInput(inputPath);

	return score;
}
