import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import NavbarComponent from "../NavbarComponent";
import {
  getAsistenciaHoy,
  updateAsistencia,
  crearListaAsistencia,
} from "../../services/asistencia";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Loading from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loadingAccion, setLoadingAccion] = useState(null);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const today = moment().format("YYYY-MM-DD");

  const [faltanIngreso, setFaltanIngreso] = useState(0);
  const [faltanEgreso, setFaltanEgreso] = useState(0);

  const exportToExcel = () => {
    const formattedData = filteredData.map((row) => ({
      "Nombre Completo": row.colaborador.nombre,
      Apellido: row.colaborador.apellido,
      "Tipo Colaborador": row.colaborador.tipo_colaborador,
      "Fecha Ingreso": row.fecha_ingreso
        ? `${row.fecha_ingreso} ${row.hora_ingreso}`
        : "",
      "Fecha Egreso": row.fecha_egreso
        ? `${row.fecha_egreso} ${row.hora_egreso}`
        : "",
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    XLSX.writeFile(wb, "reporte_asistencias.xlsx");
  };

  useEffect(() => {
    const filtered = data.filter((row) => {
      const nombreCompleto = row.colaborador.nombre ? row.colaborador.nombre.toLowerCase() : '';
      const apellido = row.colaborador.apellido ? row.colaborador.apellido.toLowerCase() : '';
      const tipoColaborador = row.colaborador.tipo_colaborador ? row.colaborador.tipo_colaborador.toLowerCase() : '';
  
      return (
        nombreCompleto.includes(searchText) ||
        apellido.includes(searchText) ||
        tipoColaborador.includes(searchText)
      );
    });
  
    setFilteredData(filtered);
  }, [searchText, data]);  

  const fetchData = async () => {
    try {
      const response = await getAsistenciaHoy();
      setData(response.data);
      setFilteredData(response.data);

      if (response.data.length === 0) {
        await crearListaAsistencia();
        const newResponse = await getAsistenciaHoy();
        setData(newResponse.data);
        setFilteredData(newResponse.data);
      }
    } catch (error) {
      console.error("Error al obtener las asistencias:", error);
    }
  };

  useEffect(() => {
    if (location.state?.dataParams) {
      toast.success("Bienvenido al Sistema de Administración", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [location.state]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const ingresoPendiente = filteredData.filter(
      (row) =>
        !row.fecha_ingreso &&
        moment(row.created_at).format("YYYY-MM-DD") === today
    ).length;

    const egresoPendiente = filteredData.filter(
      (row) => row.fecha_ingreso && !row.fecha_egreso
    ).length;

    setFaltanIngreso(ingresoPendiente);
    setFaltanEgreso(egresoPendiente);
  }, [filteredData]);

  const handleAsistencia = async (row, tipo) => {
    setLoadingAccion(row.id);
    try {
      await updateAsistencia(row.id, tipo);
      toast.success("Asistencia actualizada correctamente");
      fetchData();
    } catch (error) {
      toast.error("Error al actualizar la asistencia");
    } finally {
      setLoadingAccion(null);
    }
  };

  const columns = [
    {
      name: "Nombre Completo",
      selector: (row) => row.colaborador.nombre,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.colaborador.apellido,
      sortable: true,
    },
    {
      name: "Tipo Colaborador",
      selector: (row) => row.colaborador.tipo_colaborador,
      sortable: true,
    },
    {
      name: "Fecha Ingreso",
      selector: (row) =>
        row.fecha_ingreso ? (
          `${row.fecha_ingreso} ${row.hora_ingreso}`
        ) : (
          <button
            onClick={() => handleAsistencia(row, "ingreso")}
            className="btn btn-success"
            disabled={
              loadingAccion === row.id ||
              moment(row.created_at).format("YYYY-MM-DD") !== today
            }
          >
            {loadingAccion === row.id ? <Loading size="sm" /> : "Ingreso"}
          </button>
        ),
    },
    {
      name: "Fecha Egreso",
      selector: (row) =>
        row.fecha_egreso
          ? `${row.fecha_egreso} ${row.hora_egreso}`
          : row.fecha_ingreso && (
              <button
                onClick={() => handleAsistencia(row, "egreso")}
                className="btn btn-danger"
                disabled={moment(row.created_at).format("YYYY-MM-DD") !== today}
              >
                {loadingAccion === row.id ? <Loading size="sm" /> : "Egreso"}
              </button>
            ),
    },
  ];

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
          <span>Registro de Asistencias</span>
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
              Faltan por Ingresar: {faltanIngreso}
            </div>
          </Col>
          <Col>
            <div
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                padding: "10px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Faltan por Egresar: {faltanEgreso}
            </div>
          </Col>
        </Row>
  
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
            <><FaFileExcel
              onClick={exportToExcel}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "20px",
                color: "#28a745",
              }} /><input
              type="text"
              placeholder="Buscar..."
              className="form-control w-25"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value ? e.target.value.toLowerCase() : '')}
              />
            </>
          }
          customStyles={customStyles}
        />
        
      </Container>
    </div>
  );
};

export default Home;
