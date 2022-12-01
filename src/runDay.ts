async function main() {
	const day = parseInt(process.argv[2], 10);

	if (Number.isNaN(day)) {
		throw new Error(`${process.argv[2]} is not a day.`);
	}

	const paddedDay = day < 10 ? `0${day}` : `${day}`;
	await import(`./${paddedDay}/day`);
}

main();

export {};
