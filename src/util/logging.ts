export function printSeparator() {
	console.log(
		'\n*******************************************************************************\n',
	);
}

export function printStats() {
	const used = process.memoryUsage().heapUsed / 1024 / 1024;
	printSeparator();
	console.log(`\nMemory used: ${Math.round(used * 100) / 1000} MB\n\n`);
}
