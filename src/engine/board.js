import _ from 'lodash';
import 'babel-polyfill';

class Board {
  static DISC1 = 0;
  static DISC2 = 1;

  static getOpponentDisc(disc) {
    if (disc === Board.DISC1) {
      return Board.DISC2;
    }
    return Board.DISC1;
  }

  constructor({ numCol, numRow }) {
    this.numCol = numCol;
    this.numRow = numRow;

    // [Array(numRow) x numCol]. Bottom left corner is [0][0], get a cell with [colN][rowN].
    this._board = _.chunk(Array(numCol * numRow), numRow);
  }

  isEmpty(disc) {
    return _.isUndefined(disc);
  }

  isEmptyCell(colN, rowN) {
    let self = this;

    return this.isEmpty(self._board[colN][rowN]);
  }

  placeDisc(colN, rowN, disc) {
    this._board[colN][rowN] = disc;
  }

  getColumn(colN) {
    return this._board[colN];
  }

  getCellDisc(colN, rowN) {
    return this._board[colN][rowN];
  }

  *lineTraverse(startColN, startRowN, colDelta, rowDelta) {
    let self = this;
    let nextColN = startColN + colDelta;
    let nextRowN = startRowN + rowDelta;

    while (_.inRange(nextColN, 0, self.numCol) && _.inRange(nextRowN, 0, self.numRow)) {
      yield self._board[nextColN][nextRowN];
      nextColN += colDelta;
      nextRowN += rowDelta;
    }
  }

  asciiDraw() {
    var self = this;
    _.forEach(_.range(5, -1, -1), function(rowN) {
      var row = rowN + ': |';
      _.forEach(_.range(7), function(colN) {
        var _map = {
          undefined: ' ',
          [Board.DISC1]: 'O',
          [Board.DISC2]: 'X',
        };
        row += (_map[self._board[colN][rowN]]) + '|';
      });
      console.log(row);
    });
    console.log('   ---------------');
  }
}

export default Board;
