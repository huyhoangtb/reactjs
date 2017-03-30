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
import ContactPage from 'components/pages/contact';
import createBrowserHistory from 'history/createBrowserHistory'
//multi language (i18n)
import {addLocaleData, IntlProvider, FormattedMessage} from 'react-intl';
import i18nIntegration from 'services/i18n';
import MessagesDefault from 'i18n/en-US';
//support for material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles";
//support for tab on material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const history = createBrowserHistory();
const middleware = routerMiddleware(history)

const lightMuiTheme = getMuiTheme(lightBaseTheme);

let store = createStore(
    AppReducers,
    compose(applyMiddleware(middleware),
        devToolsEnhancer ? devToolsExtension() : f => f)
);

var i18nMessagesDefault = MessagesDefault['en-US'];

i18nIntegration(function (locale) {
    console.log(i18nMessagesDefault);
    render(
        <Provider store={store}>
            <IntlProvider
                locale={locale}
                messages={window.i18nMessages[locale] || i18nMessagesDefault}>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <ConnectedRouter history={history}>
                        <div>
                            {/*<AuthButton/>*/}
                            <ul>
                                <li>
                                    <Link to="/public">
                                        {app.en}
                                        <FormattedMessage
                                            id="app.en"
                                            defaultMessage={i18nMessagesDefault['app.en']}
                                        />
                                    </Link>
                                </li>
                                <li><Link to="/login">Protected Page</Link></li>
                                <li><Link to="/contact-us">Contact Page</Link></li>
                            </ul>
                            <Route path="/public" component={Logout}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/contact-us" component={ContactPage}/>
                            {/*<PrivateRoute path="/protected" component={Protected}/>*/}
                        </div>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </IntlProvider>
        </Provider>
        ,
        document.getElementById('app')
    )
});