import * as css from './stylesheet.scss';

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// import asyncValidate from './asyncValidate'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
    return sleep(1000) // simulate server latency
        .then(() => {
            if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
                throw { email: 'Email already Exists' }
            }
        })
}
const validate = values => {
    const errors = {}
    const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
)

const renderCheckbox = ({ input, label, meta: { touched, error }, children }) => {
    console.log(error);
    return (
        <Checkbox label={label}
                  checked={input.value ? true : false}
                  onCheck={input.onChange}/>
    )
}

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}/>
)

const Contact = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="firstName" component={renderTextField} label="First Name"/>
            </div>
            <div>
                <Field name="lastName" component={renderTextField} label="Last Name"/>
            </div>
            <div>
                <Field name="email" component={renderTextField} label="Email"/>
            </div>
            {/*<div>*/}
                {/*<Field name="sex" component={RadioButtonGroup}>*/}
                    {/*<RadioButton value="male" label="male"/>*/}
                    {/*<RadioButton value="female" label="female"/>*/}
                {/*</Field>*/}
            {/*</div>*/}
            <div>
                <Field name="employed" component={renderCheckbox} label="Employed"/>
            </div>
            <div>
                <Field name="notes" component={renderTextField} label="Notes" multiLine={true} rows={2}/>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'Contact',  // a unique identifier for this form
    validate,
    asyncValidate
})(Contact)
