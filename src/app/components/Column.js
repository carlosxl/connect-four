import _ from 'lodash';
import { Circle, Group, Rect } from 'react-konva';
import React from 'react';

import * as config from '../config';
import EngineBoard from '../../engine/board';
import gameStore from '../stores/gameStore';
import * as GameActions from '../actions/GameActions';

export default class Column extends React.Component {
  constructor(props) {
    super(props);

    const handlerNames = [
      'handleMouseout', 'handleMouseover', 'makeMove'
    ];

    handlerNames.forEach((name) => {
      this[name] = this[name].bind(this);
    });

    this.state = {
      data: gameStore.getColumn(props.colN),
      mouseover: false
    };
  }

  componentWillMount() {
    gameStore.on('move', () => {
      this.setState({
        data: gameStore.getColumn(this.props.colN),
      });
    });

    gameStore.on('restart', () => {
      this.setState({
        data: gameStore.getColumn(this.props.colN),
      });
    });
  }

  getX() {
    return this.props.colN * config.cellSideLength;
  }

  getY() {
    return 0;
  }

  getWidth() {
    return config.cellSideLength;
  }

  getHeight() {
    return this.props.numRow * config.cellSideLength;
  }

  handleMouseover() {
    this.setState({mouseover: true});
  }

  handleMouseout() {
    this.setState({mouseover: false});
  }

  makeMove() {
    GameActions.move(this.props.colN);
  }

  render() {
    const numRow = this.props.numRow;
    const cells = _.range(numRow).map((rowN) => {
      let discColor;

      switch (this.state.data[rowN]) {
        case EngineBoard.DISC1:
          discColor = 'red';
          break;

        case EngineBoard.DISC2:
          discColor = 'green';
          break;

        default:
          discColor = config.discDefaultColor;
          break;
      }

      return (
        <Circle
          key={rowN}
          x={this.getX() + config.cellSideLength / 2}
          y={(numRow - rowN - 1) * config.cellSideLength + config.cellSideLength / 2}
          radius={config.discRadius}
          fill={discColor}
        />
      );
    });

    return (
      <Group
        onMouseover={this.handleMouseover}
        onMouseout={this.handleMouseout}
        onClick={this.makeMove}
        onTap={this.makeMove}>
        <Rect
          x={this.getX()}
          y={this.getY()}
          width={this.getWidth()}
          height={this.getHeight()}
          fill={this.state.mouseover ? config.boardBackgroundColorMouseOver
                                     : config.boardBackgroundColor}
        />
        {cells}
      </Group>
    );
  }
}
