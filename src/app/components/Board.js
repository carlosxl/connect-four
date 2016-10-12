import _ from 'lodash';
import { Group } from 'react-konva';
import React from 'react';

import Column from './Column';
import GameStore from '../stores/GameStore';

export default class Board extends React.Component {
  constructor() {
    super();

    this.state = {
      board: GameStore.getBoard()
    };
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
      });
    });
  }

  render() {
    const columns = _.range(this.props.numCol).map((colN) => {
      return (
        <Column
          key={colN}
          colN={colN}
          numRow={this.props.numRow}
          data={this.state.board.getColumn(colN)}
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
