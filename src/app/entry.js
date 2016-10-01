import _ from 'lodash';
import Game from '../engine/game';

document.write("hello world!");

var game = new Game();

_.forEach(_.range(35), function() {
  let v = game.move(_.random(6));
  if (v) {
    game.logInfo();
  }
});
game.logInfo();
