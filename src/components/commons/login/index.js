import React from 'react';
import * as css from './stylesheet.scss';
import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {intl, user} =this.props;
        return (
            <div className="ui-login-panel1">
                {t1(intl, "day la cai gi")}
                <a href="http://xpeak.vn" target="_blank">
                    <img className="xpeak-icon" src="/public/resources/images/icons/xpeak-icon.png"/>
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps) (injectI18N(Login));