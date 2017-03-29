// import ReactDOM from 'react-dom';
// import React from 'react';
// import Overview from './components/recognition/overview/overview';
//
//
// ReactDOM.render(<Overview/>, document.getElementById("app"));

import React from 'react'
import {BrowserRouter as Router, Route, Link, Match} from 'react-router-dom';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux';
import AppReducers from 'reducers/AppStore';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import Login from 'components/commons/login';
import Logout from 'components/commons/logout';

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();
const middleware = routerMiddleware(history)


let store = createStore(
    AppReducers,
    compose(applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
);

const publicPath = '/';

export const routeCodes = {
    DASHBOARD: publicPath,
    LOGOUT: `${ publicPath }logout`,
    LOGIN: `${ publicPath }login`,
};

const Child = ({match}) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
)


render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {/*<AuthButton/>*/}
                <ul>
                    <li><Link to="/public">Public Page</Link></li>
                    <li><Link to="/login">Protected Page</Link></li>
                </ul>
                <Route path="/public" component={Logout}/>
                <Route path="/login" component={Login}/>
                {/*<PrivateRoute path="/protected" component={Protected}/>*/}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)
