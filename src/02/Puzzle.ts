import { AbstractPuzzle } from '../types/Puzzle';
import { sumArray } from '../util/array';

export default class Day02Puzzle extends AbstractPuzzle {
	private lines: string[] = [];

	protected processInput(): void {
		this.lines = this.input.trim().split(/\n+/);
	}

	public solveFirst() {
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

		const scores: number[] = [];

		this.lines.forEach((line) => {
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

		const totalScore = sumArray(scores);

		return totalScore.toString();
	}

	public solveSecond() {
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

		const scores: number[] = [];

		this.lines.forEach((line) => {
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

		const totalScore = sumArray(scores);

		return totalScore.toString();
	}
}
