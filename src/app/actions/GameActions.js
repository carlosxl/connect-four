import dispatcher from '../dispatcher';


export function move(colN) {
  dispatcher.dispatch({
    type: 'MOVE',
    data: {
      colN: colN
    }
  });
}

export function restart() {
  dispatcher.dispatch({
    type: 'RESTART',
    data: {}
  });
}
