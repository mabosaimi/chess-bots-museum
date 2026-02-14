import chess
from chess_museum.core.evaluator import BaseEvaluator


def minimax_search(
    board: chess.Board, depth: int, evaluator: BaseEvaluator
) -> chess.Move:
    """Find best move using minimax search.

    Args:
        board: Current position
        evaluator: Position evaluator
        depth: Search depth

    Returns:
        Best move found"""

    best_move = None
    best_score = float("-inf") if board.turn == chess.WHITE else float("inf")

    for move in board.legal_moves:
        board.push(move)
        score = _minimax(board, depth - 1, evaluator)
        board.pop()

        if board.turn == chess.WHITE:
            if score > best_score:
                best_score = score
                best_move = move
        else:
            if score < best_score:
                best_score = score
                best_move = move

    return best_move


def _minimax(board: chess.Board, depth: int, evaluator: BaseEvaluator) -> float:
    """Recursive minimax evaluation of the position"""

    if depth == 0 or board.is_game_over():
        return evaluator.evaluate(board)

    if board.turn == chess.WHITE:
        max_score = float("-inf")
        for move in board.legal_moves:
            board.push(move)
            score = _minimax(board, depth - 1, evaluator)
            board.pop()
            max_score = max(max_score, score)
        return max_score
    else:
        min_score = float("inf")
        for move in board.legal_moves:
            board.push(move)
            score = _minimax(board, depth - 1, evaluator)
            board.pop()
            min_score = min(min_score, score)
        return min_score
