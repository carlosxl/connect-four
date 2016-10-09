import _ from 'lodash';
import { Group } from 'react-konva';
import React from 'react';

import Column from './Column';

export default class Board extends React.Component {
  render() {
    const columns = _.range(this.props.numCol).map((colN) => {
      return (
        <Column
          key={colN}
          colN={colN}
          numRow={this.props.numRow}
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
