import { Layer, Stage } from 'react-konva';
import React from 'react';

import * as config from '../config';
import Board from './Board';

export default class App extends React.Component {
  getBoardWidth() {
    return this.props.numCol * config.cellSideLength;
  }

  getBoardHeight() {
    return this.props.numRow * config.cellSideLength;
  }

  render() {
    return (
      <Stage width={this.getBoardWidth()} height={this.getBoardHeight()}>
        <Layer>
          <Board numCol={this.props.numCol} numRow={this.props.numRow} game={this.props.game} />
        </Layer>
      </Stage>
    );
  }
}
