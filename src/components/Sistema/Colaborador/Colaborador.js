import React, { useEffect, useState } from "react";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import NavbarComponent from "../../NavbarComponent";
import { Container, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  getAllColaborador,
  setColaborador,
  updateColaborador,
  EstadoColaborador,
} from "../../../services/Catalogos/colaborador";
import AgregarColaborador from "./components/AgregarColaborador";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

const Colaborador = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

    const exportToExcel = () => {
      const formattedData = filteredData.map((row) => ({
        "Nombre Completo": row.nombre,
        "Apellido": row.apellido,
        "Telefono": row.telefono,
        "Departamento": row.departamento.nombre,
        "Correo Electronico": row.email,
        "Dirección" : row.direccion,
        "Tipo_colaborador" : row.tipo_colaborador
      }));
  
      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Colaboradores");
  
      XLSX.writeFile(wb, "reporte_colaboradores.xlsx");
    };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllColaborador();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error al obtener colaboradores:", error);
    }
  };

  const handleOpenModal = (colaborador = null) => {
    setSelectedColaborador(colaborador);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedColaborador(null);
    setShowModal(false);
  };

  const handleSubmitColaborador = async (colaborador, idColaborador) => {
    try {
      if (idColaborador) {
        await updateColaborador(idColaborador, colaborador);
        toast.success(`Registro Actualizado!`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        try {
          await setColaborador(colaborador);
          toast.success(`Registro Agregado!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } catch (error) {
          toast.error(`Ocurrió un problema!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Error al guardar colaborador:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  
    const filtered = data.filter((item) => {
      const nombre = item.nombre ? item.nombre.toLowerCase() : '';
      const cui = item.cui ? item.cui.toLowerCase() : '';
      const apellido = item.apellido ? item.apellido.toLowerCase() : '';
      const telefono = item.telefono ? item.telefono.toString() : '';
      const email = item.email ? item.email.toString().toLowerCase() : '';
      const direccion = item.direccion ? item.direccion.toLowerCase() : '';
      const tipo_colaborador = item.tipo_colaborador ? item.tipo_colaborador.toLowerCase() : '';

      return (
        tipo_colaborador.includes(value) ||
        direccion.includes(value) ||
        telefono.includes(value) ||
        nombre.includes(value) ||
        cui.includes(value) ||
        apellido.includes(value) ||
        email.includes(value)
      );
    });
    
    setFilteredData(filtered);
  };  

  const handleToggleEstado = async (row) => {
    try {
      const nuevoEstado = !row.activo;
      EstadoColaborador(row.id, { activo: nuevoEstado });
      toast.success(
        `Registro ${nuevoEstado ? "Activado" : "Inactivado"} con éxito!`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );

      fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      toast.error("Error al cambiar el estado", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true, width: "60px" },
    { name: "Nombre Completo", selector: (row) => row.nombre, sortable: true },
    { name: "Apellidos", selector: (row) => row.apellido, sortable: true },
    { name: "Teléfono", selector: (row) => row.telefono, sortable: true },
    { name: "Correo", selector: (row) => row.email, sortable: true },
    { name: "Departamento", selector: (row) => row.departamento.nombre, sortable: true },
    { name: "Dirección", selector: (row) => row.direccion, sortable: true },
    {
      name: "Tipo Colaborador",
      selector: (row) => row.tipo_colaborador,
      sortable: true,
    },
    {
      name: "ESTADO",
      cell: (row) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: row.activo ? "#28a745" : "#dc3545",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {row.activo ? "Activo" : "Inactivo"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "ACCIONES",
      cell: (row) => (
        <>
          <Button
            variant="link"
            size="sm"
            onClick={() => handleOpenModal(row)}
            style={{ color: "black", fontSize: "20px", padding: "5px" }}
          >
            <FaEdit />
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => handleToggleEstado(row)}
            style={{
              color: row.activo ? "#28a745" : "#dc3545",
              fontSize: "20px",
              padding: "5px",
            }}
          >
            {row.activo ? <FaToggleOn /> : <FaToggleOff />}
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#ffffff",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#17c3a2",
        color: "white",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f8f9fa",
        "&:nth-of-type(odd)": {
          backgroundColor: "#e9ecef",
        },
        "&:hover": {
          backgroundColor: "#d6d8db",
          cursor: "pointer",
        },
        borderBottom: "1px solid #dee2e6",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#ffffff",
      },
    },
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
            Catálogo Colaboladores
          </div>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Agregar un nuevo registro
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
                  onClick={exportToExcel}
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
          <AgregarColaborador
            show={showModal}
            handleClose={handleCloseModal}
            idColaborador={selectedColaborador?.id || null}
            colaboradorData={selectedColaborador}
            onSubmit={handleSubmitColaborador}
          />
        </Container>
      </div>
    </div>
  );
};

export default Colaborador;
