import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import {
	createStore,
	applyMiddleware
} from 'redux';

import { gameStore } from './state';
import WindmillsApp from './containers/WindmillsAppA';

const logger = createLogger({
	collapsed: true
});
const store = createStore(gameStore, applyMiddleware(thunk, promise, logger));

const containerElement = document.getElementById('windmills-app');

ReactDOM.render(
	<Provider store={ store }>
		<WindmillsApp />
	</Provider>,
	containerElement
);
