import React from 'react';
import { Image } from 'react-bootstrap';
import { PATHS } from '../../../routes/paths';
import ForgotPasswordForm from './form';

export default function ForgotPassword() {
    return (
        <div className="h-100 w-100 position-absolute d-flex align-items-center justify-content-center flex-column">
            <div className="login bg-white d-flex flex-column align-items-center">
                <Image className="logo" src={require('../../../images/logo.png')} />
                <h1>Forgot Password</h1>
                <ForgotPasswordForm />
                <a href={PATHS.LOGIN} className="mt-2 text-decoration-none">
                    You remember, click here to login
                </a>
            </div>
        </div>
    );
}
