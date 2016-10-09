import _ from 'lodash';
import React from 'react';

import gameStore from '../stores/gameStore';
import * as GameActions from '../actions/GameActions';

export default class GamePanel extends React.Component {
  constructor() {
    super();

    this.state = {
      nextMovePlayerName: gameStore.getNextMovePlayerName(),
      winnerName: null
    };
  }

  componentWillMount() {
    gameStore.on('endGame', () => {
      this.setState({winnerName: gameStore.getWinnerName()});
    });

    gameStore.on('move', () => {
      this.setState({nextMovePlayerName: gameStore.getNextMovePlayerName()});
    });

    gameStore.on('restart', () => {
      this.setState({
        nextMovePlayerName: gameStore.getNextMovePlayerName(),
        winnerName: null
      });
    });
  }

  // TODO: Add deconstructors.

  handleRestart() {
    GameActions.restart();
  }

  render() {
    let infoMsg = '';

    if (this.state.winnerName) {
      infoMsg = `${_.capitalize(this.state.winnerName)} won.`;
    } else {
      infoMsg = `${_.capitalize(this.state.nextMovePlayerName)}'s turn`;
    }

    return (
      <div>
        <p class="text-center">{infoMsg}</p>
        <p>
          <button class="btn btn-default center-block"
            onClick={this.handleRestart.bind(this)}>
            Restart
          </button>
        </p>
      </div>
    );
  }
}
