import { jsPDF } from "jspdf";

const generatePDF = (response) => {
  const pdf = new jsPDF();
  pdf.setFont("helvetica", "bold");

  const marginX = 15;
  const marginY = 15;
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

  const logoSrc = "ruta/a/tu/logo.jpg";
  pdf.addImage(logoSrc, "JPEG", marginX, marginY, 30, 30);

  const addImageToPDF = (src, x, y, width, height, label) => {
    pdf.addImage(src, "JPEG", x, y, width, height);
    pdf.text(label, x + width / 2, y + height + 10, null, null, "center");
  };

  if (response.paths?.length > 0) {
    addImageToPDF(response.paths[0], marginX + 10, posY, 60, 60, "Foto Frontal");
  }

  if (response.paths?.length > 1) {
    addImageToPDF(response.paths[1], marginX + 100, posY, 60, 60, "Foto Trasera");
  }

  pdf.save(`visitante_${response.acceso.id}.pdf`);
};

export default generatePDF;
