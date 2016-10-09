import _ from 'lodash';
import { Circle, Group, Rect } from 'react-konva';
import React from 'react';

import * as config from '../config';

export default class Column extends React.Component {
  constructor() {
    super();

    const bindAll = [
      'handleMouseout', 'handleMouseover',
    ];

    bindAll.map((name) => {
      this[name] = this[name].bind(this);
    });

    this.state = {mouseover: false};
  }

  getX() {
    return this.props.column * config.cellSideLength;
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

  render() {
    const cells = _.range(this.props.numRow).map((i) => {
      return (
        <Circle
          key={i}
          x={this.getX() + config.cellSideLength / 2}
          y={i * config.cellSideLength + config.cellSideLength / 2}
          radius={config.discRadius}
          fill={config.boardCellBackgroundColor}
        />
      );
    });

    return (
      <Group onMouseover={this.handleMouseover} onMouseout={this.handleMouseout}>
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
