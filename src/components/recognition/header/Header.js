import React from 'react';
import * as css from './_header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui-d-recognition-header">
                <a href="http://xpeak.vn" target="_blank">
                    <img className="xpeak-icon" src="/public/resources/images/icons/xpeak-icon.png"/>
                </a>
            </div>
        );
    }
}

export default Header;