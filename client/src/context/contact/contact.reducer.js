import { ADD_CONTACT, CLEAR_CURRENT, CLEAR_FILTER, DELETE_CONTACT, FILTER_CONTACT, SET_CURRENT, UPDATE_CONTACT, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACT_ERROR } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload)
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact => contact._id.match(action.payload) || contact.name.match(action.payload) || contact.email.match(action.payload))
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload.id ? action.payload : contact)
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        case CLEAR_CONTACT_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}