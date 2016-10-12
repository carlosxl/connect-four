import { EventEmitter } from 'events';

import Game from '../../engine/game';
import dispatcher from '../dispatcher';


class GameStore extends EventEmitter {
  constructor() {
    super();
    this.game = new Game();
  }

  getBoard() {
    return this.game.board;
  }

  getWinnerName() {
    return this.game.discToPlayerName(this.game.winner);
  }

  getNextMovePlayerName() {
    return this.game.discToPlayerName(this.game.nextMoveDisc);
  }

  move(colN) {
    this.game.move(colN);
    this.emit('move');

    if (this.game.isEndGame()) {
      this.emit('endGame');
    }
  }

  restart() {
    this.game = new Game();
    this.emit('restart');
  }

  handleActions(action) {
    switch (action.type) {
      case 'MOVE':
        this.move(action.data.colN);
        break;

      case 'RESTART':
        this.restart();
        break;
    }
  }
}

const gameStore = new GameStore;
dispatcher.register(gameStore.handleActions.bind(gameStore));
export default gameStore;
