import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import NavbarComponent from "../../NavbarComponent";
import {
  getListaAcceso,
  EditarAcceso,
  crearAcceso,
  getDocumento,
} from "../../../services/acceso";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Loading from "../../Loading";
import ModalForm from "./components/ModalForm";
import "react-toastify/dist/ReactToastify.css";
import ModalPreview from "./components/ModalPreview";
import { reactLocalStorage } from "reactjs-localstorage";
import { FaFileExcel } from "react-icons/fa";

const customStyles = {
  table: { style: { backgroundColor: "#ffffff" } },
  headRow: {
    style: { backgroundColor: "#17c3a2", color: "#fff", fontWeight: "bold" },
  },
  rows: {
    style: {
      backgroundColor: "#f8f9fa",
      "&:nth-of-type(odd)": { backgroundColor: "#e9ecef" },
    },
  },
  pagination: { style: { backgroundColor: "#ffffff" } },
};

const Accesos = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loadingAccion, setLoadingAccion] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [faltanEgreso, setFaltanEgreso] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const egresoPendiente = filteredData.filter(
      (row) => !row.fecha_egreso && row.fecha_ingreso
    ).length;

    setFaltanEgreso(egresoPendiente);
  }, [filteredData]);

  const fetchData = async () => {
    try {
      const response = await getListaAcceso();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error al obtener los accesos:", error);
    }
  };

  const handleAcceso = async (row) => {
    setLoadingAccion(row.id);
    try {
      await EditarAcceso(row.id);
      toast.success("Acceso actualizado correctamente");
      fetchData();
    } catch (error) {
      toast.error("Error al actualizar el acceso");
    } finally {
      setLoadingAccion(null);
    }
  };

  const handleAccess = async (row) => {
    const id = row.id;
    const response = await getDocumento(id);
    setSelectedRow(response);
    setShowPreviewModal(true);
  };

  const handleCreateAcceso = async (params) => {
    try {
      reactLocalStorage.getObject("var");
      await crearAcceso(params);
      toast.success("Acceso creado correctamente");
      fetchData();
    } catch (error) {
      toast.error("Error al crear el acceso");
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, maxWidth: "5px" },
    {
      name: "Nombre Completo",
      selector: (row) => row.visitante.nombre_completo,
      sortable: true,
    },
    {
      name: "Cui / Pasaporte",
      selector: (row) =>
        row.visitante.es_extranjero
          ? row.visitante.pasaporte
          : row.visitante.cui,
      sortable: true,
    },
    {
      name: "Extranjero",
      selector: (row) => (row.visitante.es_extranjero ? "Sí" : "No"),
      sortable: true,
    },
    {
      name: "Tipo Ingreso",
      selector: (row) => row.ingreso.nombre,
      sortable: true,
    },
    {
      name: "Fecha Ingreso",
      selector: (row) => `${row.fecha_ingreso} ${row.hora_ingreso}`,
      sortable: true,
    },
    {
      name: "Hora Egreso",
      selector: (row) =>
        row.fecha_egreso
          ? `${row.fecha_egreso} ${row.hora_egreso}`
          : row.fecha_ingreso && (
              <button
                onClick={() => handleAcceso(row)}
                className="btn btn-danger"
                disabled={loadingAccion === row.id}
              >
                {loadingAccion === row.id ? <Loading size="sm" /> : "Egreso"}
              </button>
            ),
    },
    {
      name: "Detalle Registro",
      selector: (row) =>
        row.id && (
          <button
            onClick={() => handleAccess(row)}
            className="btn btn-success"
            disabled={loadingAccion === row.id}
          >
            {loadingAccion === row.id ? <Loading size="sm" /> : "Ver"}
          </button>
        ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  
    const filtered = data.filter((item) => {
      const nombreCompleto = item.visitante.nombre_completo ? item.visitante.nombre_completo.toLowerCase() : '';
      const cui = item.visitante.cui ? item.visitante.cui.toLowerCase() : '';
      const ingresoNombre = item.ingreso.nombre ? item.ingreso.nombre.toLowerCase() : '';
      const esExtranjero = item.visitante.es_extranjero ? item.visitante.es_extranjero.toString().toLowerCase() : '';
      
      return (
        nombreCompleto.includes(value) ||
        cui.includes(value) ||
        ingresoNombre.includes(value) ||
        esExtranjero.includes(value)
      );
    });
    
    setFilteredData(filtered);
  };  

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />
      <NavbarComponent />
      <div>
        <Container
          className="mt-4"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "#007bff",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "120%",
            }}
          >
            <span>Registro de Visitantes</span>
          </div>

          <Row className="mb-3 text-center">
            <Col>
              <div
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Faltan por Egresar: {faltanEgreso}
              </div>
            </Col>
          </Row>

          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{ marginBottom: "20px" }}
          >
            Crear un nuevo registro
          </Button>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            responsive
            fixedHeader
            fixedHeaderScrollHeight="400px"
            subHeader
            subHeaderComponent={
              <>
                <FaFileExcel
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "20px",
                    color: "#28a745",
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="form-control w-25"
                  value={searchText}
                  onChange={handleSearch}
                />
              </>
            }
            customStyles={customStyles}
          />
        </Container>
      </div>

      <ModalForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleCreateAcceso={handleCreateAcceso}
      />
      <ModalPreview
        show={showPreviewModal}
        toggle={() => setShowPreviewModal(false)}
        response={selectedRow}
      />
    </div>
  );
};

export default Accesos;
