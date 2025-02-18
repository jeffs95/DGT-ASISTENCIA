import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const AgregarColaborador = ({ show, handleClose, idColaborador, colaboradorData, onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion: '',
        tipo_colaborador: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (colaboradorData) {
            setFormData(colaboradorData);
        } else {
            setFormData({
                nombre: '',
                apellido: '',
                telefono: '',
                email: '',
                direccion: '',
                tipo_colaborador: ''
            });
        }
    }, [colaboradorData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        const phoneRegex = /^[0-9]{8}$/;
        if (formData.telefono && !phoneRegex.test(formData.telefono)) {
            formErrors.telefono = 'El teléfono debe contener 8 dígitos numéricos';
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            formErrors.email = 'El correo electrónico no tiene un formato válido';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData, idColaborador);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{idColaborador ? 'Editar' : 'Agregar'} Colaborador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            <ul>
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Apellidos <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            isInvalid={!!errors.apellido}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="number"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            isInvalid={!!errors.telefono}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            isInvalid={!!errors.direccion}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Colaborador <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Select
                            name="tipo_colaborador"
                            value={formData.tipo_colaborador}
                            onChange={handleChange}
                            isInvalid={!!errors.tipo_colaborador}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="INTERNO">Interno</option>
                            <option value="EXTERNO">Externo</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.tipo_colaborador}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {idColaborador ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AgregarColaborador;
