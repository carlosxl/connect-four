import _ from 'lodash';
import { Group } from 'react-konva';
import React from 'react';

import Column from './Column';
import GameStore from '../stores/GameStore';

export default class Board extends React.Component {
  constructor() {
    super();

    this.state = {
      board: GameStore.getBoard(),
      winningCells: GameStore.getWinningCells()
    };

    window.game = GameStore.game;
  }

  componentWillMount() {
    GameStore.on('move', () => {
      this.setState({
        board: GameStore.getBoard(),
      });
    });

    GameStore.on('restart', () => {
      this.setState({
        board: GameStore.getBoard(),
        winningCells: GameStore.getWinningCells(),
      });
    });

    GameStore.on('endGame', () => {
      this.setState({
        winningCells: GameStore.getWinningCells(),
      });
    });
  }

  render() {
    const columns = _.range(this.props.numCol).map((colN) => {
      const winningCells = this.state.winningCells;
      const colWinningCells = _.filter(
        winningCells, function([ _colN ]) { return _colN === colN; });

      return (
        <Column
          key={colN}
          colN={colN}
          numRow={this.props.numRow}
          data={this.state.board.getColumn(colN)}
          winningCells={colWinningCells}
        />
      );
    });

    return (
      <Group>
        {columns}
      </Group>
    );
  }
}
