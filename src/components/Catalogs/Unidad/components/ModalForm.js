import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ModalForm = ({ show, handleClose, idIngreso, unidadData, onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {        
        if (unidadData) {
            setFormData({ nombre: unidadData.nombre }); 
        } else {
            setFormData({ nombre: '' });
        }
    }, [unidadData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.nombre.trim()) {
            formErrors.nombre = 'El nombre de la unidad es obligatorio';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData, idIngreso);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{idIngreso ? 'Editar' : 'Agregar'} Unidad</Modal.Title>
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
                        <Form.Label>Nombre</Form.Label>
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

                    <Button variant="primary" type="submit">
                        {idIngreso ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
