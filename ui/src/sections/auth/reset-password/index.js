import React from 'react';
import { Image } from 'react-bootstrap';
import ResetPasswordForm from './form';

export default function ResetPassword() {
    return (
        <div className="h-100 w-100 position-absolute d-flex align-items-center justify-content-center flex-column">
            <div className="login bg-white d-flex flex-column align-items-center py-5 px-5">
                <Image className="logo" src={require('../../../images/logo.png')} />
                <h1>Reset Password</h1>
                <ResetPasswordForm />
            </div>
        </div>
    );
}
