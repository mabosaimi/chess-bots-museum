import Board from "./components/Board";

function App() {
	return (
		<main>
			<h1 className="animate-pulse font-bold text-4xl text-blue-500 text-center pt-48">
				Chess Bots Museum
			</h1>
			<div className="mx-auto mt-10">
				<Board />
			</div>
		</main>
	);
}

export default App;
