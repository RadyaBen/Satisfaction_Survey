import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './redux/helpers';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style.css';
// import '../src/components/';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
document.getElementById('root'));