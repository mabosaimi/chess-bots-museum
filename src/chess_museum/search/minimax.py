import chess
from chess_museum.core.evaluator import BaseEvaluator

def minimax_search(
    board: chess.Board,
    evaluator: BaseEvaluator,
    depth: int
) -> chess.Move:
    """Find best move using minimax"""
    ...
