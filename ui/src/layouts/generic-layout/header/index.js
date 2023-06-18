import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { PATHS } from '../../../routes/paths';

export default function Header() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const onLogoutClicked = async () => {
        try {
            setIsSubmitting(true);

            await logout();

            setIsSubmitting(false);

            navigate(PATHS.LOGIN);
        } catch (error) {
            console.log(error);
        }
    };

    const displayName = `${user.firstName} ${user.surname}`;

    return (
        <nav className="navbar card my-2 border-0 rounded-1 shadow-sm">
            <div className="container-fluid">
                <span>{displayName}</span>
                <button className="btn btn-danger" onClick={onLogoutClicked}>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" hidden={!isSubmitting} />
                    Logout
                </button>
            </div>
        </nav>
    );
}
