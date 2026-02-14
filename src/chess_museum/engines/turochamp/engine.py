import chess

from chess_museum.core.engine import BaseEngine
from chess_museum.engines.turochamp.evaluate import TurochampEvaluator
from chess_museum.search.minimax import minimax_search


class Turochamp(BaseEngine):
    def __init__(self) -> None:
        super().__init__(TurochampEvaluator())
        self.name = "Turochamp"
        self.year = 1948
        self.description = "One of the earliest chess engines, developed by Alan Turing and David Champernowne. It used a simple evaluation function and a minimax search to select moves."
        self.author = "Alan Turing & David Champernowne"

    def get_best_move(self, board: chess.Board) -> chess.Move:
        """Calculate and return the best move for the current position.

        Args:
            board: Current board state

        Returns:
            Best move found by the engine
        """
        return minimax_search(board, depth=3, evaluator=self.evaluator)
