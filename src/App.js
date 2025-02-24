import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { LoadingProvider, useLoading } from './components/context/LoadingContext';
import Loading from './components/Loading';
import ProtectedRoute from './ProtectedRoute';

import Login from './components/Login';
import Home from './components/Home/Home';
import Colaborador from './components/Sistema/Colaborador/Colaborador';
import Usuario from './components/Catalogs/Usuario/usuario';
import Accesos from './components/Sistema/Accesos/Accesos';
import Ingreso from './components/Catalogs/Ingreso/Ingreso';
import Unidad from './components/Catalogs/Unidad/unidad';
import AcuerdoGubernativo from './components/Catalogs/AcuerdoGubernativo/AcuerdoGubernativo';
import AcuerdoMinisterial from './components/Catalogs/AcuerdoMinisterial/AcuerdoMinisterial';
import Unauthorized from './components/Unauthorized'; 
import Departamento from './components/Catalogs/Departamento/Departamento'; 

const RouteChangeHandler = ({ children }) => {
    const { loading, setLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [location.pathname, setLoading]);

    return (
        <>
            {loading && <Loading />}
            {children}
        </>
    );
};

function App() {
    return (
        <LoadingProvider>
            <Router>
                <RouteChangeHandler>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/AcuerdoGubernativo" element={<ProtectedRoute element={<AcuerdoGubernativo />} />} />
                        <Route path="/AcuerdoMinisterial" element={<ProtectedRoute element={<AcuerdoMinisterial />} />} />
                        <Route path="/Accesos" element={<ProtectedRoute element={<Accesos />} />} />
                        <Route path="/Unidad" element={<ProtectedRoute element={<Unidad />} />} />
                        <Route path="/Ingreso" element={<ProtectedRoute element={<Ingreso />} />} />
                        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                        <Route path="/colaborador" element={<ProtectedRoute element={<Colaborador />} />} />
                        <Route path="/usuario" element={<ProtectedRoute element={<Usuario />} />} />
                        <Route path="/departamento" element={<ProtectedRoute element={<Departamento />} />} />
                    </Routes>
                </RouteChangeHandler>
            </Router>
        </LoadingProvider>
    );
}

export default App;
