import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import { USER_TYPES } from '../config';
import { PATHS } from '../routes/paths';

// ----------------------------------------------------------------------

RoleGuard.propTypes = {
    exptectedUserTypes: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(USER_TYPES))),
    children: PropTypes.node
};

export default function RoleGuard({ children, exptectedUserTypes }) {
    const { user } = useAuth();
    const location = useLocation();

    const [requestedLocation, setRequestedLocation] = useState(null);

    console.log(exptectedUserTypes.includes(user?.userType), user?.userType, exptectedUserTypes);
    if (!exptectedUserTypes.includes(user?.userType)) {
        return <Navigate to={PATHS.FORBIDDEN} />;
    }

    if (requestedLocation && location?.pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}
