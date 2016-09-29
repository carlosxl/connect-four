import _ from 'lodash';
import Board from './board';

class Game {
  constructor() {
    this._board = new Board({ maxColN: 7, maxRowN: 6 });

    this.nextMoveDisc = Board.DISC1;
  }

  switchPlayer() {
    this.nextMoveDisc = this.nextMoveDisc ^ 1;
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
    this.switchPlayer();
  }

  isEndGame() {
    return false;
  }

  logInfo() {
    return this._board.asciiDraw();
  }
}

export default Game;
