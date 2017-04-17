import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStoreAndMiddleware } from './Reduxify';
import { WindmillsApp } from './App';

const store = createStoreAndMiddleware(process.env);

ReactDOM.render(
	<Provider store={store}>
		<WindmillsApp />
	</Provider>,
	document.getElementById('windmills-app')
);
