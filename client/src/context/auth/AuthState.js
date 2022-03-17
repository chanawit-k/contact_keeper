import React, { useReducer, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import AuthContext from './authContext';
import authReducer from './authReducer';

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

const AuthtState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // load user

    // register user

    // login user

    // logout user

    // clear user

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthtState;
