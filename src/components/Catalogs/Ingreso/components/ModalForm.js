import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ModalForm = ({
  show,
  handleClose,
  idIngreso,
  colaboradorData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correlativo: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (colaboradorData) {
      setFormData(colaboradorData);
    } else {
      setFormData({
        nombre: "",
        correlativo: "",
      });
    }
  }, [colaboradorData]);

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
      onSubmit(formData, idIngreso);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{idIngreso ? "Editar" : "Agregar"} Ingreso</Modal.Title>
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
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correlativo</Form.Label>
            <Form.Control
              type="number"
              name="correlativo"
              value={formData.correlativo}
              onChange={handleChange}
              isInvalid={!!errors.correlativo}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.correlativo}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {idIngreso ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
