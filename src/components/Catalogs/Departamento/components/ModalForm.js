import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ModalForm = ({ show, handleClose, idDepartamento, acuerdoMinisterialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (acuerdoMinisterialData) {
            setFormData(acuerdoMinisterialData);
        } else {
            setFormData({
                nombre: '',
                descripcion: '',
            });
        }
    }, [acuerdoMinisterialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData, idDepartamento);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{idDepartamento ? 'Editar' : 'Agregar'} Departamento</Modal.Title>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            isInvalid={!!errors.descripcion}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {idDepartamento ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
