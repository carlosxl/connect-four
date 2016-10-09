import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const mountElement = document.getElementById('app');
ReactDOM.render(<App numCol={7} numRow={6} />, mountElement);
