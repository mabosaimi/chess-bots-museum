"""As per: https://www.chessprogramming.org/Turochamp#Evaluation_Features

Point Values for Material: Pawn=1, Knight=3, Bishop=3.5, Rook=5, Queen=10
Mobility: For the pieces other than Kings and pawns, add the square roots of the number of moves that the piece can make, counting a capture as two moves.
Piece safety: If a Rook, Bishop, or Knight is defended once, add 1 point; add 1.5 points if it is defended twice.
King mobility: Use the same method as above, but don’t count castling.
King safety : Deduct x points for a vulnerable King, with x being the number of moves that a Queen could move if it were on the same square as the one occupied by the King.
Castling: When evaluating a move, add 1 point if castling is still possible after the move is made. Add another point if castling is immediately possible or if the castling move has just been performed.
Pawn credit: Score 0.2 points for each square advanced, plus 0.3 points for each pawn defended by one or more non-pawns.
Checks and mate threats: Score 1 point for the threat of mate and a half-point for a check.
"""

import chess

from chess_museum.core.evaluator import BaseEvaluator

PIECE_VALUES = {
    chess.PAWN: 1.0,
    chess.KNIGHT: 3.0,
    chess.BISHOP: 3.5,
    chess.ROOK: 5.0,
    chess.QUEEN: 10.0,
    chess.KING: 0.0,
}


class TurochampEvaluator(BaseEvaluator):
    """Alan Turing's 1948 chess evaluation function"""

    def evaluate(self, board: chess.Board) -> float:
        """Evaluate position from white's perspective"""
        score = self._count_material(board)
        # TODO: rest of the evaluation features
        return score

    @staticmethod
    def _count_material(board: chess.Board) -> float:
        """Returns material difference (white - black)"""
        score = 0.0
        for square in chess.SQUARES:
            piece = board.piece_at(square)
            if piece:
                value = PIECE_VALUES[piece.piece_type]
                score += value if piece.color == chess.WHITE else -value
        return score
