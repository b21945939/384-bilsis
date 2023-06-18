import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

// create a loading component to use in the Suspense fallback prop
export default function Loading() {
    return (
        // fill all page
        <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-white">
            <Spinner
                animation="border"
                style={{
                    width: '4rem',
                    height: '4rem'
                }}
            />
        </div>
    );
}
