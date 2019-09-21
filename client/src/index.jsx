import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './app/app.component';
import AuthState from './context/auth/auth.state';
import ContactState from './context/contact/contact.state';
import AlertState from './context/alert/alert.state';

ReactDOM.render(
    <AuthState>
        <ContactState>
            <AlertState>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AlertState>
        </ContactState>
    </AuthState>,
    document.getElementById('root'));