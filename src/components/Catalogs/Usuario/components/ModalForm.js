import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getAllColaborador } from "../../../../services/colaborador";

const ModalForm = ({ show, handleClose, idUsuario, usuarioData, onSubmit }) => {
    const [colaboradores, setColaboradores] = useState([]);
    const [formData, setFormData] = useState({
        nombre_completo: "",
        email: "",
        admin: false,
        colaborador_id: "",
        password: "",
    });

    useEffect(() => {
        const fetchColaboradores = async () => {
            try {
                const response = await getAllColaborador();
                console.log('[RESPONSE] >', response.data);
                
                setColaboradores(response.data);
            } catch (error) {
                console.error("Error al cargar los colaboradores:", error);
            }
        };

        fetchColaboradores();

        setFormData(
            usuarioData ?? {
                nombre_completo: "",
                email: "",
                admin: false,
                colaborador_id: "",
                password: "",
            }
        );
    }, [usuarioData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userPayload = {
            nombre_completo: `${formData.nombre_completo}`,
            email: formData.email,
            admin: formData.admin,
            colaborador_id: formData.colaborador_id,
        };
        onSubmit(userPayload, idUsuario);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{idUsuario ? "Editar" : "Agregar"} Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre_completo"
                            value={formData.nombre_completo}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Colaborador</Form.Label>
                        <Form.Select
                            name="colaborador_id"
                            value={formData.colaborador_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un Colaborador...</option>
                            {colaboradores?.map((colaborador) => (
                                <option key={colaborador.id} value={colaborador.id}>
                                    {colaborador.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Administrador"
                            name="admin"
                            checked={formData.admin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {idUsuario ? "Actualizar" : "Guardar"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
