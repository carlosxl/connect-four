import _ from 'lodash';
import { Group } from 'react-konva';
import React from 'react';

import Column from './Column';

export default class Board extends React.Component {
  render() {
    let game = this.props.game;

    const columns = _.range(this.props.numCol).map((colN) => {
      return (
        <Column
          key={colN}
          colN={colN}
          numRow={this.props.numRow}
          data={game.board.getColumn(colN)}
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
