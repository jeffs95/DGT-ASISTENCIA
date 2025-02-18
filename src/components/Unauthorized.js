import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center mb-3">
                <img src="/img/logo.png" alt="Logo" style={{ maxWidth: '350px' }} />
            </div>
            <div className="bg-white p-5 rounded shadow-lg text-center" style={{ maxWidth: '400px' }}>
                <FaExclamationTriangle size={50} className="text-danger mb-3" />
                <h2 className="text-danger fw-bold mb-3">Acceso Denegado</h2>
                <p className="text-secondary">Debes iniciar sesión para acceder a esta página.</p>
                <p className="text-muted small">Redirigiendo al inicio de sesión...</p>
            </div>
        </div>
    );
};

export default Unauthorized;
