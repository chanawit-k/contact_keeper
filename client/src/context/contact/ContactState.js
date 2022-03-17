import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contact
    const getContact = async () => {
        try {
            const res = axios.get('/api/contacts');
            res.then((res) => {
                dispatch({ type: GET_CONTACTS, payload: res.data });
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg,
            });
        }
    };

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = axios.post('/api/contacts', contact, config);
            console.log(res);
            dispatch({ type: ADD_CONTACT, payload: contact });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg,
            });
        }
    };

    // Delete Contact
    const deleteContact = (id) => {
        try {
            const res = axios.delete('/api/contacts/' + id + '/');
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg,
            });
        }
    };

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update Contact
    const updateContact = (contact) => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = axios.put(
                '/api/contacts/' + contact._id + '/',
                contact,
                config
            );
            dispatch({ type: UPDATE_CONTACT, payload: contact });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg,
            });
        }
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContact,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
