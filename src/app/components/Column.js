import _ from 'lodash';
import { Circle, Group, Rect } from 'react-konva';
import React from 'react';

import * as config from '../config';
import EngineBoard from '../../engine/board';
import * as GameActions from '../actions/GameActions';

export default class Column extends React.Component {
  constructor(props) {
    super(props);

    const handlerNames = [
      'handleMouseout', 'handleMouseover', 'handleMove'
    ];

    handlerNames.forEach((name) => {
      this[name] = this[name].bind(this);
    });

    this.state = {
      mouseover: false
    };
  }

  getColCanvasX() {
    return this.props.colN * config.cellSideLength;
  }

  getColCanvasY() {
    return 0;
  }

  getColWidth() {
    return config.cellSideLength;
  }

  getColHeight() {
    return this.props.numRow * config.cellSideLength;
  }

  handleMouseover() {
    this.setState({mouseover: true});
  }

  handleMouseout() {
    this.setState({mouseover: false});
  }

  handleMove() {
    GameActions.move(this.props.colN);
  }

  render() {
    const numRow = this.props.numRow;
    const winningCells = this.props.winningCells;

    const cells = _.range(numRow).map((rowN) => {
      let discColor, strokeColor;

      switch (this.props.data[rowN]) {
        case EngineBoard.DISC1:
          discColor = config.discPlayer1Color;
          break;

        case EngineBoard.DISC2:
          discColor = config.discPlayer2Color;
          break;

        default:
          discColor = config.discDefaultColor;
          break;
      }

      if (_.find(winningCells, function([_colN, _rowN]) { return _rowN === rowN; })) {
        strokeColor = 'red';
      } else {
        strokeColor = null;
      }

      return (
        <Circle
          key={rowN}
          x={this.getColCanvasX() + config.cellSideLength / 2}
          y={(numRow - rowN - 1) * config.cellSideLength + config.cellSideLength / 2}
          radius={config.discRadius}
          fill={discColor}
          stroke={strokeColor}
          strokeWidth={5}
        />
      );
    });

    return (
      <Group
        onMouseover={this.handleMouseover}
        onMouseout={this.handleMouseout}
        onClick={this.handleMove}
        onTap={this.handleMove}>
        <Rect
          x={this.getColCanvasX()}
          y={this.getColCanvasY()}
          width={this.getColWidth()}
          height={this.getColHeight()}
          fill={this.state.mouseover ? config.boardBackgroundColorMouseOver
                                     : config.boardBackgroundColor}
        />
        {cells}
      </Group>
    );
  }
}
