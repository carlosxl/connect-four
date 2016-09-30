import _ from 'lodash';

class Board {
  constructor({ maxColN, maxRowN }) {
    // [Array(maxRowN) x maxColN]. Bottom left corner is [0][0], get a cell with [colN][rowN].
    this._board = _.chunk(Array(maxColN * maxRowN), maxRowN);
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

// Static data properties
Board.DISC1 = 0;
Board.DISC2 = 1;

Board.getOpponentDisc = function(disc) {
  return disc ^ 1;
};

export default Board;
