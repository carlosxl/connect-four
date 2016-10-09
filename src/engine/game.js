import _ from 'lodash';
import Board from './board';

class Game {
  static PLAYER1_NAME = 'player 1';
  static PLAYER2_NAME = 'player 2';

  constructor (numCol=7, numRow=6, winCondition=4) {
    this.board = new Board({ numCol, numRow });
    this.nextMoveDisc = Board.DISC1;
    this.totalMoves = 0;
    this.winner;

    this._winCondition = winCondition;
  }

  discToPlayerName(disc) {
    if (disc === Board.DISC1) {
      return Game.PLAYER1_NAME;
    }

    return Game.PLAYER2_NAME;
  }

  switchPlayer() {
    this.nextMoveDisc = Board.getOpponentDisc(this.nextMoveDisc);
  }

  move(colN) {
    if (this.isEndGame()) {
      return false;
    }

    const col = this.board.getColumn(colN);
    const nextRowN = _.indexOf(col, undefined);

    if (nextRowN === -1) {
      return false;
    }

    this.board.placeDisc(colN, nextRowN, this.nextMoveDisc);
    this.totalMoves++;
    this.switchPlayer();
    return true;
  }

  isEndGame() {
    let colN, rowN;

    if (!_.isUndefined(this.winner)) {
      return true;
    }

    for (colN = 0; colN < this.board.numCol; colN++) {
      for (rowN = 0; rowN < this.board.numRow; rowN++) {
        if (this.board.isEmptyCell(colN, rowN)) {
          break;
        }

        const thisDisc = this.board.getCellDisc(colN, rowN);
        let traverseIter;

        // check upward
        traverseIter = this.board.lineTraverse(colN, rowN, 0, 1);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check up right diagonal
        traverseIter = this.board.lineTraverse(colN, rowN, 1, 1);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check right
        traverseIter = this.board.lineTraverse(colN, rowN, 1, 0);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check down right diagonal
        traverseIter = this.board.lineTraverse(colN, rowN, 1, -1);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }
      }
    }

    return false;

    function traverseUntilWinCondition(thisDisc, iter) {
      let numConnected = 1;

      while (true) {
        let { value: nextDisc, done } = iter.next();

        if (done) {
          return false;
        }

        if (this.board.isEmpty(nextDisc)) {
          break;
        }

        if (nextDisc === thisDisc) {
          numConnected++;
          if (numConnected === this._winCondition) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }
}

export default Game;
