export function sumArray(input: number[]) {
	return input.reduce((acc, curr) => {
		return acc + curr;
	}, 0);
}

export function findGreatest(input: number[]) {
	return input.reduce(
		(acc, curr, index) => {
			if (curr > acc.value) return { value: curr, index };
			return acc;
		},
		{ value: 0, index: -1 },
	);
}

export function findGreatestN(input: number[], n: number = 1) {
	const sortedArray = [...input].sort((a, b) => b - a);
	return sortedArray.slice(0, n);
}

export default {
	sumArray,
	findGreatest,
	findGreatestN,
};
