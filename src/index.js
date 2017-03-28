// import ReactDOM from 'react-dom';
// import React from 'react';
// import Overview from './components/recognition/overview/overview';
//
//
// ReactDOM.render(<Overview/>, document.getElementById("app"));

import React from 'react'
import {BrowserRouter as Router, Route, Link, Match} from 'react-router-dom';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import AppStore from './reducers/AppStore';

let store = createStore(AppStore, devToolsEnhancer());

render(
    <Provider store={store}>
        <Router>
            <Route component={Recognition}>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
