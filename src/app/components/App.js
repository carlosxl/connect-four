import { Layer, Stage } from 'react-konva';
import React from 'react';

import * as config from '../config';
import Board from './Board';
import GamePanel from './GamePanel';

export default class App extends React.Component {
  getBoardWidth() {
    return this.props.numCol * config.cellSideLength;
  }

  getBoardHeight() {
    return this.props.numRow * config.cellSideLength;
  }

  render() {
    const boardStyle = {
      'width': `${this.getBoardWidth()}px`
    };

    return (
      <div>
        <div class="center-block" style={boardStyle}>
          <Stage width={this.getBoardWidth()} height={this.getBoardHeight()}>
            <Layer>
              <Board numCol={this.props.numCol} numRow={this.props.numRow} />
            </Layer>
          </Stage>
        </div>
        <GamePanel />
      </div>
    );
  }
}
