import { SnackbarProvider as NotistackProvider } from 'notistack';
import PropTypes from 'prop-types';
import { useRef } from 'react';
//
import Iconify from '../iconify';
//
import Button from 'react-bootstrap/esm/Button';

// ----------------------------------------------------------------------

SnackbarProvider.propTypes = {
    children: PropTypes.node
};

export default function SnackbarProvider({ children }) {
    const notistackRef = useRef(null);

    const onClose = (key) => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <>
            <NotistackProvider
                ref={notistackRef}
                dense
                maxSnack={5}
                preventDuplicate
                autoHideDuration={3000}
                variant="success" // Set default variant
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                iconVariant={{
                    info: <SnackbarIcon icon="eva:info-fill" color="info" />,
                    success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
                    warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
                    error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />
                }}
                // With close as default
                action={(key) => (
                    <Button size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
                        <Iconify icon="eva:close-fill" />
                    </Button>
                )}
            >
                {children}
            </NotistackProvider>
        </>
    );
}

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

function SnackbarIcon({ icon, color }) {
    return (
        <span
            style={{
                mr: 1.5,
                width: 40,
                height: 40,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                color
            }}
        >
            <Iconify icon={icon} width={24} />
        </span>
    );
}
