import React, { useContext, useEffect, Fragment } from 'react';
import './navbar.component.scss';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../context/auth/auth.context';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;

    useEffect(() => {
        // eslint-disable-next-line        
    }, [isAuthenticated, logout, user]);

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={() => logout()}>
                    <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1>
                <Link to='/'>
                    <i className={icon} /> {title}
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                {
                    isAuthenticated ? authLinks : guestLinks
                }
            </ul>
        </div>
    )
}

export default Navbar;