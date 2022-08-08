import { useGame } from "../Context/GameProvider";
import Cell from "./Cell";

const Board = () => {
	const { board, play, currentTurn, disableBoard } = useGame();

	return (
		<div className="board">
			{board.map((mark, idx) => (
				<Cell
					key={idx}
					mark={mark}
					onClick={() => {
						if (disableBoard) return;
						play(idx, currentTurn);
					}}
					disabled={disableBoard}
				/>
			))}
		</div>
	);
};

export default Board;
