import type { Dests, Key } from "@lichess-org/chessground/types";
import { useCallback, useState } from "react";

export interface GameState {
	fen: string;
	dests: Dests;
	turnColor: "white" | "black";
	isGameOver: boolean;
	lastMove?: [Key, Key];
	isCheck: boolean;
	outcome: string | null;
}

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function useChessGame(runPython: (code: string) => Promise<any>) {
	const [gameState, setGameState] = useState<GameState>({
		fen: INITIAL_FEN,
		dests: new Map(),
		turnColor: "white",
		isGameOver: false,
		isCheck: false,
		outcome: null,
	});

	const initGame = useCallback(async () => {
		await runPython(`
import chess
import json

board = chess.Board()

def get_dests():
    dests = {}
    for move in board.legal_moves:
        orig = chess.square_name(move.from_square)
        dest = chess.square_name(move.to_square)
        if orig not in dests:
            dests[orig] = []
        dests[orig].append(dest)
    return json.dumps(dests)

def get_game_state():
    outcome = board.outcome()
    outcome_str = None
    if outcome:
        winner = outcome.winner
        if winner is None:
            outcome_str = "draw"
        elif winner:
            outcome_str = "white"
        else:
            outcome_str = "black"
    return json.dumps({
        "fen": board.fen(),
        "dests": json.loads(get_dests()),
        "turnColor": "white" if board.turn == chess.WHITE else "black",
        "isGameOver": board.is_game_over(),
        "isCheck": board.is_check(),
        "outcome": outcome_str,
    })
`);

		const stateJson = await runPython("get_game_state()");
		const state = JSON.parse(stateJson);

		setGameState({
			fen: state.fen,
			dests: new Map(Object.entries(state.dests)) as Dests,
			turnColor: state.turnColor,
			isGameOver: state.isGameOver,
			isCheck: state.isCheck,
			outcome: state.outcome,
		});
	}, [runPython]);
	const pushMove = useCallback(
		async (orig: Key, dest: Key) => {
			const uci = `${orig}${dest}`;
			// TODO: add promotion ui instead of always promoting to queen
			const moveResult = await runPython(`
import json
move = chess.Move.from_uci("${uci}")
if move not in board.legal_moves:
    move = chess.Move.from_uci("${uci}q")
board.push(move)
get_game_state()
`);

			const state = JSON.parse(moveResult);

			setGameState({
				fen: state.fen,
				dests: new Map(Object.entries(state.dests)) as Dests,
				turnColor: state.turnColor,
				isGameOver: state.isGameOver,
				lastMove: [orig, dest],
				isCheck: state.isCheck,
				outcome: state.outcome,
			});
		},
		[runPython],
	);

	const resetGame = useCallback(async () => {
		await runPython("board.reset()");
		const stateJson = await runPython("get_game_state()");
		const state = JSON.parse(stateJson);

		setGameState({
			fen: state.fen,
			dests: new Map(Object.entries(state.dests)) as Dests,
			turnColor: state.turnColor,
			isGameOver: state.isGameOver,
			isCheck: state.isCheck,
			outcome: state.outcome,
		});
	}, [runPython]);

	return { gameState, initGame, pushMove, resetGame };
}
