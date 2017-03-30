import * as css from './stylesheet.scss';

import React from 'react'
import {Field, reduxForm} from 'redux-form'
import  InputText from 'components/forms/elements/input-text';
import {injectI18N, t, t1, t2, t3, t4} from "utils/I18nUtils";
import * as cssGrid from 'react-bootstrap';

const Contact = props => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <div className="row">
            <div className="col-sm-6">
                <InputText/>
            </div>
            <div className="col-sm-6">

            </div>
        </div>
    )
}

export default reduxForm({
    form: 'Contact',  // a unique identifier for this form
})(Contact)
