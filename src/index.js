import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import logger from 'redux-logger';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';

import saga from './saga';


const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(saga);

ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>

    , document.getElementById('root'))
