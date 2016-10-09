import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../engine/game';
import App from './components/App';

// let game = new Game();
//
// _.forEach(_.range(35), function() {
//   let v = game.move(_.random(6));
//   if (v) {
//     game.logInfo();
//   }
// });
// game.logInfo();

const mountElement = document.getElementById('app');
let game = new Game();
ReactDOM.render(<App numCol={7} numRow={6} game={game} />, mountElement);


setTimeout(() => {
  game.move(1);
}, 10);
