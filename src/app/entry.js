import _ from 'lodash';
import Game from '../engine/game';

document.write("hello world!");

var game = new Game();

_.forEach(_.range(30), function() {
  game.move(_.random(6));
});
game.logInfo();
