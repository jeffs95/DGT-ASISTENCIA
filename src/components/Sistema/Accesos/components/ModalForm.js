import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FiCamera } from "react-icons/fi";
import { reactLocalStorage } from "reactjs-localstorage";
import { getListaIngreso } from "../../../../services/ingreso";

const ModalForm = ({ show, handleClose, handleCreateAcceso }) => {
  const [cui, setCui] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [ingresoId, setIngresoId] = useState("");
  const [dpiFrontal, setDpiFrontal] = useState(null);
  const [dpiTrasera, setDpiTrasera] = useState(null);
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const data = await getListaIngreso();
        setIngresos(data.data);
      } catch (error) {
        console.error("Error al obtener ingresos:", error);
      }
    };

    fetchIngresos();
  }, []);

  const handleDpiUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (type === "frontal") {
          setDpiFrontal(reader.result);
        } else {
          setDpiTrasera(reader.result);
        }
      };
    }
  };

  const handleSubmit = () => {
    if (!cui || !nombreCompleto || !ingresoId || !dpiFrontal || !dpiTrasera) {
      alert("Todos los campos son obligatorios, incluyendo las fotos del DPI");
      return;
    }

    const storedData = reactLocalStorage.getObject("id");
    const idUser = storedData.user_id;

    const accesoData = {
      usuario_id: idUser,
      cui,
      nombre_completo: nombreCompleto,
      ingreso_id: ingresoId,
      dpi_base64: [dpiFrontal, dpiTrasera],
    };

    handleCreateAcceso(accesoData);

    setCui("");
    setNombreCompleto("");
    setIngresoId("");
    setDpiFrontal(null);
    setDpiTrasera(null);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Visitante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIngresoId">
            <Form.Label>
              Tipo Ingreso <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              as="select"
              value={ingresoId}
              onChange={(e) => setIngresoId(e.target.value)}
            >
              <option value="">Selecciona...</option>
              {ingresos?.map((ingreso) => (
                <option key={ingreso.id} value={ingreso.id}>
                  {ingreso.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formNombreCompleto">
            <Form.Label>
              Nombre Completo <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCUI">
            <Form.Label>
              Código Único de Identificación (CUI) del Visitante <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={cui}
              onChange={(e) => setCui(e.target.value)}
            />
          </Form.Group>

          {/* Fila con Foto Frontal y Foto Trasera */}
          <Row className="mb-3">
            {/* Cuadro para Foto Frontal */}
            <Col md={6}>
              <Form.Group controlId="formDpiFrontal">
                <Form.Label>
                  Foto Frontal del Documento <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <div
                  className="dpi-box"
                  style={{
                    border: "2px dashed #ddd",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "15px",
                  }}
                  onClick={() => document.getElementById("dpiFrontalUpload").click()}
                >
                  {dpiFrontal ? (
                    <img
                      src={dpiFrontal}
                      alt="Foto Frontal"
                      style={{
                        maxWidth: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <div>
                      <FiCamera size={40} />
                      <p>Haz clic para tomar foto frontal</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="dpiFrontalUpload"
                    onChange={(e) => handleDpiUpload(e, "frontal")}
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Cuadro para Foto Trasera */}
            <Col md={6}>
              <Form.Group controlId="formDpiTrasera">
                <Form.Label>
                  Foto Trasera del Documento <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <div
                  className="dpi-box"
                  style={{
                    border: "2px dashed #ddd",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("dpiTraseraUpload").click()}
                >
                  {dpiTrasera ? (
                    <img
                      src={dpiTrasera}
                      alt="Foto Trasera"
                      style={{
                        maxWidth: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <div>
                      <FiCamera size={40} />
                      <p>Haz clic para tomar foto trasera</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="dpiTraseraUpload"
                    onChange={(e) => handleDpiUpload(e, "trasera")}
                    style={{ display: "none" }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
