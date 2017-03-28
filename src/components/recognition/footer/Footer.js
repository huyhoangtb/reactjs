import React from 'react';
import * as css from './_footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui-d-recognition-footer">
                <div className="ui-float-left">
                    <a className="footer-link" href="http://xpeak.vn" target="_blank">
                        <span className="icon">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </span>
                        xpeak.vn
                    </a>
                </div>

                <div className="ui-float-right">
                    <a className="footer-link" href="http://xpeak.vn" target="_blank">
                        <span className="icon">
                            <i className="fa fa-android" aria-hidden="true"></i>
                        </span>
                    </a>
                    <a className="footer-link" href="http://xpeak.vn" target="_blank">
                        <span className="icon">
                            <i className="fa fa-apple" aria-hidden="true"></i>
                        </span>
                    </a>
                </div>
                <div className="ui-clear-both"><span></span></div>

            </div>
        );
    }
}

export default Footer;