import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../engine/game';
import Layout from './components/Layout';

// let game = new Game();
//
// _.forEach(_.range(35), function() {
//   let v = game.move(_.random(6));
//   if (v) {
//     game.logInfo();
//   }
// });
// game.logInfo();

const app = document.getElementById('app');
ReactDOM.render(<Layout numColumn={7} numRow={6} />, app);
