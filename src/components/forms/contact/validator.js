/**
 * Created by Peter Hoang Nguyen on 3/29/2017.
 */
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

export  const warn = (values) => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

export default validate;