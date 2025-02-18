import React from 'react';
import { Navigate } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

const ProtectedRoute = ({ element }) => {
    const authData = reactLocalStorage.getObject('var');

    if (!authData || !authData.access_token) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
};

export default ProtectedRoute;
