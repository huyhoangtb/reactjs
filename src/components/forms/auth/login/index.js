import * as css from './stylesheet.scss';

import React from 'react'
import {Field, reduxForm} from 'redux-form'
import  InputText from 'components/forms/elements/input-text';
import  CheckBox from 'components/forms/elements/check-box';
import AuthPanel from 'components/forms/auth/AuthPanel';
import RaisedButton from 'material-ui/RaisedButton';
import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {intl} =this.props;
        return (
            <AuthPanel>
                <div className="ui-auth-panel">
                    <div className="ui-auth-header">
                        <a className="active">
                            { t1(intl, 'Login')}
                            <span>/</span>
                        </a>
                        <a>
                            <span>/</span>
                            { t1(intl, 'Logout') }
                        </a>
                    </div>

                    <InputText fullWidth={true} name="username" label={ t1(intl, 'Username')}/>

                    <InputText fullWidth={true} name="password" label={ t1(intl, 'Password')}/>
                    <div className="remember-me-panel">
                        <CheckBox labelStyle={{color: "#9d9d9d"}}
                                  iconStyle={{fill: "#9d9d9d"}}
                                  name="remember_me" label={ t1(intl, 'remember_me')}/>
                    </div>

                    <div className="ui-button-group clearfix center-block">
                        <div className="pull-left">
                            <RaisedButton label={t1(intl,"Đăng nhập")} className="button" primary={true} />
                        </div>
                        <div className="pull-right">
                            <a className="forgot-password"> { t1(intl, 'Forgot password?') }</a>
                        </div>

                        <div className="login-by-another-tools">
HaHAaaaaaaaaa
                        </div>
                    </div>

                </div>
            </AuthPanel>
        );
    }
}

export default reduxForm({
    form: 'LoginForm',  // a unique identifier for this form
})(injectI18N(LoginForm))
