import React, { useReducer, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../types';
import axios from 'axios';

const AuthtState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // load  user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // register user
    const register = async (formData) => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    // login user
    const login = async (formData) => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            loadUser();
        } catch (err) {
            console.log(err.response);
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    // logout user
    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    // clear error
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthtState;
