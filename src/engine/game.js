import _ from 'lodash';
import Board from './board';

class Game {
  constructor (maxColN=7, maxRowN=6, winCondition=4) {

    this._board = new Board({ maxColN, maxRowN });
    this._winCondition = winCondition;

    this.nextMoveDisc = Board.DISC1;
    this.totalMoves = 0;
  }

  switchPlayer() {
    this.nextMoveDisc = Board.getOpponentDisc(this.nextMoveDisc);
  }

  move(colN) {
    if (this.isEndGame()) {
      this.draw();
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
  }

  isEndGame() {
    _.forEach(_.range(7), function(colN) {
      _.forEach(_.range(6), function(rowN) {
        const thisDisc = this._board.getCellDisc(colN, rowN);
        let connected = 1;

        // check upward
        while (true) {
          const nextDisc = this._board.lineTraverse(colN, rowN, 0, 1);

          if (_.isUndefined(nextDisc)) {
            break;
          }

          if (nextDisc === thisDisc) {
            connected++;
            if (connected === this.winCondition) {
              return thisDisc;
            }
          }
        }
      });
    });
  }

  logInfo() {
    this._board.asciiDraw();
    console.log(`Total moves ${this.totalMoves}.`);
  }
}

export default Game;
