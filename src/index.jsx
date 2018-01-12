import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'src/store';

import Output from 'src/components/Output';
import Input from 'src/components/Input';

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Output />
      <Input />
    </div>
  </Provider>,
  document.getElementById('app'),
);
