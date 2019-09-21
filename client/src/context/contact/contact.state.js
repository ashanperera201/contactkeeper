import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contact.context';
import contactReducer from './contact.reducer';
import {
    ADD_CONTACT, CLEAR_CURRENT, CLEAR_FILTER, DELETE_CONTACT, FILTER_CONTACT, SET_CURRENT, UPDATE_CONTACT, CONTACT_ERROR,
    GET_CONTACTS,CLEAR_CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const url = '/api/contacts'
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add contact
    const addContact = async (contact) => {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (contact) {
            try {
                var serviceResponse = await axios.post(url, contact, config);
                if (serviceResponse) {
                    dispatch({ type: ADD_CONTACT, payload: serviceResponse.data });
                }
            } catch (error) {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: error.response.data.message
                })
            }
        } else {
            dispatch({
                type: CONTACT_ERROR,
                payload: 'Invalid input object.'
            })
        }
    }

    //Delete Contact
    const deleteContact = async (id) => {
        try {
            let serviceResponse = await axios.delete(url + `/${id}`);
            if (serviceResponse) {
                dispatch({ type: DELETE_CONTACT, payload: id });
            }
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    //Set Current Contact
    const setCurrentContact = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    //Clear Current Contact
    const clearCurrentContact = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    //Update Contact
    const updateContact = async (contact) => {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            contact["id"] = contact._id;
            await axios.put(url + `/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: contact });

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    //Filter Contact
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    //Get all contacts.
    const getAllContacts = async () => {
        try {

            let serviceResponse = await axios.get(url);
            if (serviceResponse) {
                dispatch({
                    type: GET_CONTACTS,
                    payload: serviceResponse.data
                })
            }
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    //clearing errors
    const clearContactError = () => {
        dispatch({ type: CLEAR_CONTACT_ERROR });
    }


    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrentContact,
                clearCurrentContact,
                updateContact,
                filterContacts,
                clearFilter,
                getAllContacts,
                clearContactError
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
}

export default ContactState;