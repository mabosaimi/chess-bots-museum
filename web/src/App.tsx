import { useEffect } from "react";
import Board from "./components/Board";
import { useChessGame } from "./hooks/useChessGame";
import { usePyodide } from "./hooks/usePyodide";

function App() {
	const { status, error, runPython } = usePyodide();
	const { gameState, initGame, pushMove, resetGame } = useChessGame(runPython);

	useEffect(() => {
		if (status === "ready") {
			initGame();
		}
	}, [status, initGame]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Loading Python Engine...</h2>
					<div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
				</div>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center text-red-500">
					<h2 className="text-2xl font-bold mb-4">Error Loading Engine</h2>
					<p>{error?.message}</p>
				</div>
			</div>
		);
	}

	return (
		<main className="flex flex-col items-center pt-12">
			<h1 className="font-bold text-4xl text-blue-500 text-center mb-8">
				Chess Bots Museum
			</h1>
			<Board gameState={gameState} onMove={pushMove} />
			<div className="mt-4 text-center">
				{gameState.isGameOver ? (
					<div>
						<p className="text-lg font-semibold mb-2">
							{gameState.outcome === "draw"
								? "Draw!"
								: `${gameState.outcome === "white" ? "White" : "Black"} wins!`}
						</p>
						<button
							type="button"
							onClick={resetGame}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							New Game
						</button>
					</div>
				) : (
					<p className="text-sm text-gray-500">
						{gameState.turnColor === "white" ? "White" : "Black"} to move
					</p>
				)}
			</div>
		</main>
	);
}

export default App;
