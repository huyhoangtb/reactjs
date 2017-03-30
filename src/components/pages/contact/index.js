import React, {Component} from 'react';
import ContactForm from 'components/forms/contact';

class ContactPage extends Component {
    submit = (values) => {
        // Do something with the form values
        console.log(values);
    }
    render() {
        return (
            <ContactForm onSubmit={this.submit} />
        );
    }
}

export default ContactPage;