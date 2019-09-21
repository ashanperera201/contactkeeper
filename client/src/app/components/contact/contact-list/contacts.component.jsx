import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../../../context/contact/contact.context';
import ContactItem from '../contact-item/contact-item.component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ContactList = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getAllContacts } = contactContext;

    useEffect(() => {
        getAllContacts();
    }, [])

    if (contacts.length === 0) {
        return (<h4>Please add a contact.</h4>)
    }

    return (
        <Fragment>
            <TransitionGroup>
                {
                    filtered ?
                        filtered.map(contact =>
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>) :
                        contacts.map(contact =>
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>)
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default ContactList;
