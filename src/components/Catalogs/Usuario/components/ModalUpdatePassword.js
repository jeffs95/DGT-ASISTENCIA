import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateContraseña } from "../../../../services/usuarioService";
import { toast } from "react-toastify";

const ModalUpdatePassword = ({ show, handleClose, idUsuario }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("[password]", password);
      await updateContraseña(idUsuario, password);
      toast.success("Contraseña actualizada correctamente!");
      handleClose();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Error al actualizar la contraseña");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdatePassword;
