import React, { useReducer } from 'react';
import AuthContext from './auth.context';
import authReducer from './auth.reducer';
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    AUTH_ERROR
} from '../types';
import setAuthToken from '../../utils/set.ath-token';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    //Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            try {
                const res = await axios.get('/api/auth');
                if (res.data) {
                    dispatch({
                        type: USER_LOADED,
                        payload: res.data
                    })
                }
            } catch (error) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: error.response.data.msg
                })
            }
        }
    }

    //Register user
    const registerUser = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', user, config);
            if (res) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
                loadUser();
            }
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }

    }

    //Login user
    const login = async (loginData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            if (loginData) {
                const serviceResponse = await axios.post('/api/auth', loginData, config);
                if (serviceResponse) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: serviceResponse.data.token
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: 'Invalid credentials.'
                    })
                }
            }
            else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: 'Login credentials are required.'
                })
            }
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message
            })
        }
    }

    //Logout 
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    //Clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                registerUser,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;