import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Application from './components/Application';
import store from './store';
import './app.css';

// @ts-ignore
global.jQuery = require('jquery');

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);
mainElement.className = 'd-flex h-100';

// Render components
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mainElement
  );
};

render(Application);
