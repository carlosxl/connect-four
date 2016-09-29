var _ = require('lodash');

class Game {
  constructor() {
    this.board = _.chunk(Array(6 * 7), 6);
  }

  log {
    console.log(this.board);
  }
}

module.exports = Game;
