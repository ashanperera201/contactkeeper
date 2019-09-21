import React, { useContext, useEffect } from 'react';
import './home.component.scss';
import ContactList from '../../contact/contact-list/contacts.component';
import ContactForm from '../../contact/contact-form/contact-form.component';
import ContactFilter from '../../contact/contact-filter/contact-filter.component';
import AuthContext from '../../../../context/auth/auth.context';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <ContactList />
            </div>
        </div>
    )
}

export default Home;
