import React, { useReducer, useContext } from 'react';
import uuid from 'uuid';
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
    contacts: [
      {
        id: 1,
        name: 'Boom',
        email: 'boom@mail.com',
        phone: '123456',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Bell',
        email: 'Bell@mail.com',
        phone: '5678',
        type: 'professional',
      },
      {
        id: 3,
        name: 'New',
        email: 'new@mail.com',
        phone: '7898',
        type: 'friend',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
