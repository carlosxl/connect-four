import _ from 'lodash';
import Board from './board';

class Game {
  constructor (numCol=7, numRow=6, winCondition=4) {

    this._board = new Board({ numCol, numRow });
    this._winCondition = winCondition;

    this.nextMoveDisc = Board.DISC1;
    this.totalMoves = 0;
    this.winner;
  }

  switchPlayer() {
    this.nextMoveDisc = Board.getOpponentDisc(this.nextMoveDisc);
  }

  move(colN) {
    if (this.isEndGame()) {
      return false;
    }

    const col = this._board.getColumn(colN);
    const nextRowN = _.indexOf(col, undefined);

    if (nextRowN === -1) {
      return false;
    }

    this._board.placeDisc(colN, nextRowN, this.nextMoveDisc);
    this.totalMoves++;
    this.switchPlayer();
    return true;
  }

  isEndGame() {
    let colN, rowN;

    if (!_.isUndefined(this.winner)) {
      return true;
    }

    for (colN = 0; colN < this._board.numCol; colN++) {
      for (rowN = 0; rowN < this._board.numRow; rowN++) {
        if (this._board.isEmptyCell(colN, rowN)) {
          break;
        }

        const thisDisc = this._board.getCellDisc(colN, rowN);
        let traverseIter;

        // check upward
        traverseIter = this._board.lineTraverse(colN, rowN, 0, 1);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check up right and onward
        traverseIter = this._board.lineTraverse(colN, rowN, 1, 1);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check right and onward
        traverseIter = this._board.lineTraverse(colN, rowN, 1, 0);
        if (traverseUntilWinCondition.call(this, thisDisc, traverseIter)) {
          this.winner = thisDisc;
          return true;
        }

        // check down right and onward
        traverseIter = this._board.lineTraverse(colN, rowN, 1, -1);
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

        if (this._board.isEmpty(nextDisc)) {
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

  logInfo() {
    this._board.asciiDraw();
    console.log(`Total moves ${ this.totalMoves }.`);
    console.log(`The winner is ${ this.winner }.`);
  }
}

export default Game;
