import React, { useState } from "react";
import { Modal, Button, Row, Col, Image, Spinner } from "react-bootstrap";
import jsPDF from "jspdf";

const ModalPreview = ({ show, toggle, response }) => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    if (!response) return;
    setLoading(true);
  
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
  
    const marginX = 12;
    const marginY = 12;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);
    pdf.rect(marginX, marginY, pageWidth - 2 * marginX, pageHeight - 2 * marginY);
  
    let posY = marginY + 20;

    pdf.setFontSize(22);
    pdf.text("Detalles del Visitante", pageWidth / 2, posY, null, null, "center");
    posY += 15;
  
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
  
    const lineSpacing = 10;
  
    pdf.text(`ID:`, marginX + 10, posY);
    pdf.text(`${response.acceso.id}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Nombre:`, marginX + 10, posY);
    pdf.text(`${response.acceso.visitante?.nombre_completo}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`CUI:`, marginX + 10, posY);
    pdf.text(`${response.acceso.visitante?.cui}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Tipo de Ingreso:`, marginX + 10, posY);
    pdf.text(`${response.acceso.ingreso?.nombre}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Correlativo:`, marginX + 10, posY);
    pdf.text(`${response.acceso.ingreso?.correlativo}`, marginX + 50, posY);
    posY += lineSpacing * 2;
  
    pdf.text(`Fecha de Ingreso:`, marginX + 10, posY);
    pdf.text(`${response.acceso.fecha_ingreso}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Hora de Ingreso:`, marginX + 10, posY);
    pdf.text(`${response.acceso.hora_ingreso}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Fecha de Egreso:`, marginX + 10, posY);
    pdf.text(`${response.acceso.fecha_egreso}`, marginX + 50, posY);
    posY += lineSpacing;
  
    pdf.text(`Hora de Egreso:`, marginX + 10, posY);
    pdf.text(`${response.acceso.hora_egreso}`, marginX + 50, posY);
    posY += 20;
  
    const addImageToPDF = (src, x, y, width, height, label) => {
      pdf.addImage(src, "JPEG", x, y, width, height);
      pdf.text(label, x + width / 2, y + height + 10, null, null, "center");
    };
  
    if (response.paths?.length > 0) {
      addImageToPDF(response.paths[0], marginX + 10, posY, 75, 75, "Foto Frontal");
    }
  
    if (response.paths?.length > 1) {
      addImageToPDF(response.paths[1], marginX + 100, posY, 75, 75, "Foto Trasera");
    }
  
    pdf.save(`visitante_${response.acceso.id}.pdf`);
    setLoading(false);
  };

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
        {response && (
          <Button variant="primary" onClick={downloadPDF} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Descargar PDF"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPreview;
