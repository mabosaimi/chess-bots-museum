"""Base evaluator interface for all historic chess engines"""

from abc import ABC, abstractmethod

import chess


class BaseEvaluator(ABC):
    """Abstract base class for position evaluation"""

    @abstractmethod
    def evaluate(self, board: chess.Board) -> float:
        """
        Evaluate the current position from the perspective of white.

        Args:
            board: Position to evaluate

        Returns:
            Score in centipawns (positive = white advantage)
        """
        ...
