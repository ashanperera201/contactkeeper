import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../../context/auth/auth.context';
import AlertContext from '../../../../context/alert/alert.context';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    //structure
    const { error, login, isAuthenticated, clearErrors } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        } else if (error) {
            setAlert(error,'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('user name and password required', 'danger');
        } else {
            login({ email, password });
        }
    }


    return (
        <div className='form-container'>
            <h1>Account<span className='text-primary'> Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} required />
                </div>
                <input type="submit" value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Login
