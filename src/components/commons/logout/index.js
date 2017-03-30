import React from 'react';
import * as css from './stylesheet.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui-login-panel">
                <a href="http://xpeak.vn" target="_blank">
                    <img className="xpeak-icon" src="/public/resources/images/icons/xpeak-icon.png"/>
                </a>
            </div>
        );
    }
}

export default Login;