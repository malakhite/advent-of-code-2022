import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import Handlebars from 'handlebars';

const args = process.argv.slice(2);

const argDay = args[0];

const paddedDay = argDay.length < 2 ? `0${argDay}` : argDay;

const context = { day: paddedDay };

(async () => {
	try {
		const templates = join(__dirname, '..', 'templates');
		const newDay = join(__dirname, '..', paddedDay);
		const createDir = await mkdir(newDay, { recursive: true });

		console.log(`Created new directory ${createDir}`);

		const puzzleTemplate = await readFile(
			join(templates, 'Puzzle.ts.hbs'),
			'utf-8',
		);
		const compiledPuzzle = Handlebars.compile(puzzleTemplate);
		const puzzle = compiledPuzzle(context);

		const puzzleTestTemplate = await readFile(
			join(templates, 'Puzzle.test.ts.hbs'),
			'utf-8',
		);
		const compiledPuzzleTest = Handlebars.compile(puzzleTestTemplate);
		const puzzleTest = compiledPuzzleTest(context);

		await Promise.all([
			writeFile(join(newDay, 'Puzzle.ts'), puzzle, 'utf-8'),
			writeFile(join(newDay, 'Puzzle.test.ts'), puzzleTest, 'utf-8'),
		]);

		console.log(`Successfully created new day ${paddedDay}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
