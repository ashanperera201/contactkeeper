import React, { useState, useContext, useEffect } from 'react';
import './contact-form.component.scss';
import ContactContext from '../../../../context/contact/contact.context';
import AlertContext from '../../../../context/alert/alert.context';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const { addContact, current, clearCurrentContact, updateContact, error, clearContactError } = contactContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (current) {
            setContact(current);
        }
        else if (error) {
            setAlert(error, 'danger');
            clearContactError();
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
        // eslint-disable-next-line
    }, [contactContext, current, error])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type, } = contact;

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current) {
            //edit contact
            updateContact(contact);
            clearCurrentContact();
        } else {
            //add contact.
            addContact(contact);
        }
        //clear form
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const clearAll = () => {
        clearCurrentContact()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} required />
            <input type="email" placeholder='Email' name='email' value={email} onChange={onChange} required />
            <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange} required />
            <h5>Contact Type</h5>
            <input type="radio" name='type' value='personal' checked={type === 'personal'} onChange={onChange} />Personal{' '}
            <input type="radio" name='type' value='professional' checked={type === 'professional'} onChange={onChange} />professional{' '}
            <div>
                <input type="submit" value={current ? 'Edit Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
            </div>
            {
                current && (
                    <div>
                        <button className="btn btn-light btn-block" onClick={clearAll}>CLear</button>
                    </div>
                )
            }
        </form>
    )
}

export default ContactForm;