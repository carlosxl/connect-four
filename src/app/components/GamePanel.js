import _ from 'lodash';
import React from 'react';

import GameStore from '../stores/GameStore';
import * as GameActions from '../actions/GameActions';

export default class GamePanel extends React.Component {
  constructor() {
    super();

    this.state = {
      nextMovePlayerName: GameStore.getNextMovePlayerName(),
      winnerName: null
    };
  }

  componentWillMount() {
    GameStore.on('endGame', () => {
      this.setState({winnerName: GameStore.getWinnerName()});
    });

    GameStore.on('move', () => {
      this.setState({nextMovePlayerName: GameStore.getNextMovePlayerName()});
    });

    GameStore.on('restart', () => {
      this.setState({
        nextMovePlayerName: GameStore.getNextMovePlayerName(),
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
