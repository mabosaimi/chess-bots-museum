import engine
import chess


class Turochamp(engine.BaseEngine):
    def __init__(self) -> None:
        self.name: str = "BaseEngine"
        self.year: int = 1947
        self.description: str = ""
        self.author: str = "Alan Turing"

    def get_best_move(self, board: chess.Board) -> chess.Move:
        """
        Calculate and return the best move for the current position.

        Args:
            board: Current board state

        Returns:
            Best move found by the engine
        """
        
        ...

    def get_info(self) -> dict[str, str | int]:
        """Return metadata about the engine"""
        return {
            "name": self.name,
            "year": self.year,
            "description": self.description,
            "author": self.author,
        }
