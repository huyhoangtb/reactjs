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

            <popup>
                <loginForm></loginForm>
            </popup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps) (injectI18N(Login));