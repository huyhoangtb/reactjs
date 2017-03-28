// import ReactDOM from 'react-dom';
// import React from 'react';
// import Overview from './components/recognition/overview/overview';
//
//
// ReactDOM.render(<Overview/>, document.getElementById("app"));

import React from 'react'

import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Match} from 'react-router-dom';
import {devToolsEnhancer} from 'redux-devtools-extension';

import Recognition from './components/recognition/Recognition';
import Overview from './components/recognition/overview/Overview';
import Result from './components/recognition/result/Result';
import AppStore from './store/MainStore'

let store = createStore(AppStore, devToolsEnhancer());

let rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <Router>
            <Route component={Recognition}>

            </Route>
        </Router>
    </Provider>,

    rootElement
)