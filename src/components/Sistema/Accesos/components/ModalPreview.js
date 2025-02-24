import { Modal, Button, Row, Col, Image } from "react-bootstrap";

const ModalPreview = ({ show, toggle, response }) => {
  return (
    <Modal show={show} onHide={toggle} centered size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#007bff", color: "#fff" }}
      >
        <Modal.Title>Detalles del Visitante</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
        {response ? (
          <>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
              }}
            >
              <Row>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>ID:</strong> {response.acceso.id}
                  </p>
                  <p className="mb-2">
                    <strong>Nombre:</strong>{" "}
                    {response.acceso.visitante?.nombre_completo}
                  </p>
                  <p className="mb-2">
                    <strong>CUI:</strong> {response.acceso.visitante?.cui}
                  </p>
                  <p className="mb-2">
                    <strong>Tipo Ingreso:</strong>{" "}
                    {response.acceso.ingreso?.nombre}
                  </p>
                  <p className="mb-2">
                    <strong>Correlativo:</strong>{" "}
                    {response.acceso.ingreso?.correlativo}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Fecha Ingreso:</strong>{" "}
                    {response.acceso.fecha_ingreso}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha Egreso:</strong>{" "}
                    {response.acceso.fecha_egreso}
                  </p>
                  <p className="mb-2">
                    <strong>Hora Ingreso:</strong>{" "}
                    {response.acceso.hora_ingreso}
                  </p>
                  <p className="mb-2">
                    <strong>Hora Egreso:</strong> {response.acceso.hora_egreso}
                  </p>
                </Col>
              </Row>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    className="text-center mb-2"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Foto Frontal
                  </p>
                  <div
                    style={{
                      border: "2px dashed #ddd",
                      padding: "10px",
                      textAlign: "center",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={response.paths[0]}
                      alt="Foto Frontal"
                      fluid
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    className="text-center mb-2"
                    style={{
                      fontSize: "1.1rem",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Foto Trasera
                  </p>
                  <div
                    style={{
                      border: "2px dashed #ddd",
                      padding: "10px",
                      textAlign: "center",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={response.paths[1]}
                      alt="Foto Trasera"
                      fluid
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>{" "}
          </>
        ) : (
          <p className="text-center text-muted">
            No hay información disponible.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPreview;
