"""Base engine interface for all historic chess engines"""

from abc import ABC, abstractmethod
import chess


class BaseEngine(ABC):
    """Abstract base class for all chess engines in the museum"""

    def __init__(self) -> None:
        self.name: str = "BaseEngine"
        self.year: int = 1950
        self.description: str = ""
        self.author: str = ""

    @abstractmethod
    def get_best_move(self, board: chess.Board) -> chess.Move:
        """
        Calculate and return the best move for the current position.

        Args:
            board: Current board state

        Returns:
            Best move found by the engine
        """
        ...

    @abstractmethod
    def evaluate_position(self, board: chess.Board) -> float:
        """
        Evaluate the current position from the perspective of white.

        Args:
            board: Position to evaluate

        Returns:
            Score in centipawns (positive = white advantage)
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
