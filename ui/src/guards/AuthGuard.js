import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import LoginPage from '../pages/auth/LoginPage';

// components
import Loading from '../components/loading';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default function AuthGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuth();
    const location = useLocation();

    const [requestedLocation, setRequestedLocation] = useState(null);
    
    if (!isInitialized) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        if (location?.pathname !== requestedLocation) {
            setRequestedLocation(location?.pathname);
        }
        return <LoginPage />;
    }

    if (requestedLocation && location?.pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}
