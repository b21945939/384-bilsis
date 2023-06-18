import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// routes
// components
import Loading from '../components/loading';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default function GuestGuard({ children }) {
    const { isInitialized } = useAuth();

    if (!isInitialized) {
        return <Loading />;
    }

    return <>{children}</>;
}
