import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import gameStore from './stores/gameStore';

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
ReactDOM.render(<App numCol={7} numRow={6} />, mountElement);
