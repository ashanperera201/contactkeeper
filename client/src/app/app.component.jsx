import React, { Fragment, useEffect, useContext } from 'react';
import './app.component.scss';
//packages
import { Route, Switch } from 'react-router-dom';
//components
import Navbar from './components/layout/navbar/navbar.component';
import Home from './components/pages/home/home.component';
import About from './components/pages/about/about.component';
import Register from './components/auth/register/register.component';
import Login from './components/auth/login/login.component';
import Alert from './components/layout/alert/alert.component';
import setAuthToken from '../utils/set.ath-token';
//private route
import PrivateRoute from './components/routing/private-route';
import AuthContext from '../context/auth/auth.context';

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(() => {
        loadUser();
    }, [])

    return (
        <Fragment>
            <Navbar title='Contact Keeper' icon='fas fa-id-card-alt' />
            <div className="container">
                <Alert />
                <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </div>
        </Fragment>
    )
}

export default App;