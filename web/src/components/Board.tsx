import { Chessground } from "@lichess-org/chessground";
import type { Api } from "@lichess-org/chessground/api";
import type { Key } from "@lichess-org/chessground/types";
import { useEffect, useRef } from "react";
import type { GameState } from "../hooks/useChessGame";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

interface BoardProps {
	gameState: GameState;
	onMove: (orig: Key, dest: Key) => void;
}

export default function Board({ gameState, onMove }: BoardProps) {
	const boardRef = useRef<HTMLDivElement>(null);
	const cgRef = useRef<Api | null>(null);
	const onMoveRef = useRef(onMove);
	onMoveRef.current = onMove;

	useEffect(() => {
		if (boardRef.current && !cgRef.current) {
			cgRef.current = Chessground(boardRef.current, {
				coordinates: false,
				movable: {
					free: false,
					color: "white",
					events: {
						after: (orig, dest) => onMoveRef.current(orig, dest),
					},
				},
				animation: { enabled: true, duration: 200 },
			});
		}
		return () => {
			cgRef.current?.destroy();
			cgRef.current = null;
		};
	}, []);

	useEffect(() => {
		cgRef.current?.set({
			fen: gameState.fen,
			turnColor: gameState.turnColor,
			lastMove: gameState.lastMove,
			check: gameState.isCheck,
			movable: {
				free: false,
				color: gameState.isGameOver ? undefined : gameState.turnColor,
				dests: gameState.dests,
			},
		});
	}, [gameState]);

	return <div ref={boardRef} className="w-96 h-96" />;
}
