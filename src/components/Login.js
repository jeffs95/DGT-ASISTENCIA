import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { reactLocalStorage } from 'reactjs-localstorage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataParams = await loginUser(email, password);
            reactLocalStorage.setObject('id', { 'user_id': dataParams.user_id });
            reactLocalStorage.setObject('var', { 'access_token': dataParams.access_token });
            reactLocalStorage.setObject('permision', { 'admin': dataParams.admin });

            navigate('/home', { state: { dataParams } });
        } catch (err) {
            console.log('[ERROR] >', err);
            toast.error('Usuario o contraseña incorrecta.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#e9ecef' }}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {loading}
            <div className="text-center mb-3">
                <img src="/img/logo.png" alt="Logo" style={{ maxWidth: '350px' }} />
            </div>
            <Container className="d-flex justify-content-center">
                <Card className="shadow-lg p-4" style={{ maxWidth: '350px', width: '150%', borderRadius: '5px', borderTop: '3px solid #0d82ff' }}>
                    <Card.Body>
                        <p className="text-center fw-bold mb-3">DGT - CONTROL INGRESO</p>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white"><FaEnvelope /></span>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white"><FaLock /></span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Button style={{ backgroundColor: '#218838', borderColor: '#218838' }} type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2">
                                <FaSignInAlt /> Acceder
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
