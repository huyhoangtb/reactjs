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
import Login from 'components/commons/login';
import Logout from 'components/commons/logout';

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

import AppStore from 'reducers/AppStore';

let store = createStore(AppStore, devToolsEnhancer());

const publicPath = '/';

export const routeCodes = {
    DASHBOARD: publicPath,
    LOGOUT: `${ publicPath }logout`,
    LOGIN: `${ publicPath }login`,
};


render(
    <Provider store={store}>
        <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/logout">About</Link></li>
                        <li><Link to="/login">Topics</Link></li>
                    </ul>

                    <hr/>

                    <Route path={routeCodes.LOGOUT} component={Logout}>
                    </Route>
                    <Route path={routeCodes.LOGIN} component={Login}>
                    </Route>
                </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
