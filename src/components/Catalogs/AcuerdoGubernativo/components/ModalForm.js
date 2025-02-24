import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ModalForm = ({
  show,
  handleClose,
  idAcuerdoGubernativo,
  acuerdoGubernativoData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    numero: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (acuerdoGubernativoData) {
      setFormData(acuerdoGubernativoData);
    } else {
      setFormData({
        numero: "",
      });
    }
  }, [acuerdoGubernativoData]);

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
      onSubmit(formData, idAcuerdoGubernativo);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {idAcuerdoGubernativo ? "Editar" : "Agregar"} Acuerdo Gubernativo
        </Modal.Title>
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
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              isInvalid={!!errors.numero}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.numero}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            {idAcuerdoGubernativo ? "Actualizar" : "Guardar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
