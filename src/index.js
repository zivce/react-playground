import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers/index';

const initState = 
    {};

const store = createStore (
    reducers,initState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    
)

ReactDOM.render(

<Provider store = {store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>

, document.getElementById('root'))
