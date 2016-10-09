import { Layer, Stage } from 'react-konva';
import React from 'react';

import * as config from '../config';
import Board from './Board';

export default class Layout extends React.Component {
  getBoardWidth() {
    return this.props.numColumn * config.cellSideLength;
  }

  getBoardHeight() {
    return this.props.numRow * config.cellSideLength;
  }

  render() {
    return (
      <Stage width={this.getBoardWidth()} height={this.getBoardHeight()}>
        <Layer>
          <Board numColumn={this.props.numColumn} numRow={this.props.numRow} />
        </Layer>
      </Stage>
    );
  }
}
