const winningCombination = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export const isDraw = (board: string[]) => {
	return board.every(cell => cell === "x" || cell === "o");
};

export const isWin = (board: string[], turn: string) => {
	return winningCombination.some(combinations =>
		combinations.every(index => board[index] === turn)
	);
};
