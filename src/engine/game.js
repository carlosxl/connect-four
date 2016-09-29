var _ = require('lodash');

class Game {
  constructor() {
    // [Array(6) x 7], bottom left corner is board[0][0], upper left is board[0][5]
    this.board = _.chunk(Array(6 * 7), 6);

    this.last_move = null;
    this.next_disc = Game.DISC1;
    this.total_moves = 0;
  }

  switch_player() {
    this.next_disc = this.next_disc ^ 1;
  }

  move(colN) {
    if (this.is_end_game()) {
      this.draw();
      return
    }

    var col = this.board[colN];
    col[_.indexOf(col, undefined)] = this.next_disc;
    this.switch_player();
    this.draw();
  }

  is_end_game() {
    return false;
  }

  draw() {
    var self = this;
    console.log('  ______________')
    _.forEach(_.range(5, -1, -1), function(rowN) {
      var row = rowN + ': |';
      _.forEach(_.range(6), function(colN) {
        var _map = {
          undefined: ' ',
          1: 'X',
          0: 'O',
        }
        row += (_map[self.board[colN][rowN]]) + '|';
      });
      console.log(row);
    });
    console.log('  ______________')
  }
}

// Static data properties
Game.DISC1 = 0;
Game.DISC2 = 1;

module.exports = Game;
