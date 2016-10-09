import _ from 'lodash';
import { Group } from 'react-konva';
import React from 'react';

import Column from './Column';

export default class Board extends React.Component {
  render() {
    const columns = _.range(this.props.numColumn).map((i) => {
      return <Column key={i} column={i} numRow={this.props.numRow} />;
    });

    return (
      <Group>
        {columns}
      </Group>
    );
  }
}
