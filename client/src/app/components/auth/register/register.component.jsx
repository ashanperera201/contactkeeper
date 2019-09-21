import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alert.context';
import AuthContext from '../../../../context/auth/auth.context';

const Register = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { registerUser, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setAlert('please enter all fields', 'danger');
        } else if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            registerUser({
                name, email, password
            });
            setUser({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input type="password" name='confirmPassword' value={confirmPassword} onChange={onChange} />
                </div>
                <input type="submit" value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Register;
