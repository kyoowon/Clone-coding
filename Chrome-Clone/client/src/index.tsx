import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducer from './_reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {createStore(Reducer, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware)))}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

