import { Chessground } from "@lichess-org/chessground";
import { useEffect, useRef } from "react";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

export default function Board() {
	const boardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (boardRef.current) {
			Chessground(boardRef.current, {
				coordinates: false,
			});
		}
	}, []);

	return <div ref={boardRef} className="w-96 h-96" />;
}
