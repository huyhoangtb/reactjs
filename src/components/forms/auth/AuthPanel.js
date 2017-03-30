/**
 * Created by Peter Hoang Nguyen on 3/30/2017.
 */
import * as css from './stylesheet.scss';
import React from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import config from 'configs/configuration';
import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class AuthPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {intl} =this.props
        return (
            <div className="container-fluid ui-auth-panel clearfix">
                <div className="row ">

                    <div className="col-sm-6 ui-left-lpanel ">
                        <div className="content-panel center-block">
                            <div className="company-short-name">
                                { t1(intl, "welcome_to") } { t(intl, "VietED") }
                            </div>
                            <div className="ui-logo-panel ">
                                <img src={config.defaultLogo}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="content-panel">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  injectI18N(AuthPanel);