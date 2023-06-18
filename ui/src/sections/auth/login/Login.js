import React from 'react';
import Image from 'react-bootstrap/Image';
import { PATHS } from '../../../routes/paths';
import LoginForm from './form/LoginForm';

export default function Login() {
    return (
        <div className="h-100 w-100 position-absolute d-flex align-items-center justify-content-center flex-column">
            <div className="login bg-white d-flex flex-column align-items-center">
                <Image className="logo" src={require('../../../images/logo.png')} />
                <h1>Login</h1>
                <LoginForm />
                <div className="next-to-div text-center">
                    <a href={PATHS.REGISTER} className="link-primary text-decoration-none">
                        Register
                    </a>
                </div>
                <a href={PATHS.FORGOT_PASSWORD} className="mt-2 ink-primary text-decoration-none">
                    Forgot Password?
                </a>
            </div>
        </div>
    );
}
