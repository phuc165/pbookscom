import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserRole from './userRole.js';

const withAdminAuth = (Component) => {
    return (props) => {
        const role = useUserRole();

        if (role === null) {
            return <div>Loading...</div>;
        }

        if (role !== 'admin') {
            return <Navigate to="/" />;
        }

        return <Component {...props} />;
    };
};

export default withAdminAuth;
