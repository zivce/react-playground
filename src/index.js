import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import logger from 'redux-logger';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore , combineReducers, applyMiddleware,compose } from 'redux';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore (
    reducers,applyMiddleware(logger)
)

ReactDOM.render(

<Provider store = {store}>
    <BrowserRouter >
        <App />
    </BrowserRouter>
</Provider>

, document.getElementById('root'))
