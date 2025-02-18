import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import NavbarComponent from '../../NavbarComponent';
import { Container, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getAllUsuario, setUsuario, updateUsuario } from '../../../services/usuarioService';
import ModalForm from './components/ModalForm';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Usuario = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getAllUsuario();
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.log("[ERROR]>", error);
        }
    };

    const handleOpenModal = (usuario = null) => {
        setSelectedUsuario(usuario);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUsuario(null);
        setShowModal(false);
    };

    const handleSubmitUsuario = async (usuario, idUsuario) => {
        try {
            if (idUsuario) {
                await updateUsuario(idUsuario, usuario);
                toast.success('Registro Actualizado!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                await setUsuario(usuario);
                toast.success('Registro Agregado!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            }
            handleCloseModal();
            fetchData();
        } catch (error) {
            console.log("[ERROR]>", error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter(item =>
            item.id.toString().includes(value) ||
            item.nombre_completo.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const columns = [
        { name: 'Id', selector: row => row?.id, sortable: true, width: "80px" },
        { name: 'Nombre Completo', selector: row => row?.nombre_completo, sortable: true },
        { name: 'Correo', selector: row => row?.email, sortable: true },
        { name: 'Colaborador', selector: row => row?.colaborador.nombre, sortable: true },
        { 
            name: 'Administrador', 
            cell: row => (
                <span style={{ 
                    padding: "5px 10px", 
                    borderRadius: "5px", 
                    backgroundColor: row.admin ? "#28a745" : "#dc3545", 
                    color: "white", 
                    fontWeight: "bold" 
                }}>
                    {row.admin ? "Sí" : "No"}
                </span>
            ), 
            sortable: true
        },
        {
            name: 'Editar',
            cell: row => (
                <>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleOpenModal(row)}
                        style={{ color: 'black', fontSize: '20px', padding: '5px' }}
                    >
                        <FaEdit />
                    </Button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "120px"
        },
    ];

    const customStyles = {
        table: {
            style: {
                backgroundColor: '#ffffff',
            }
        },
        headRow: {
            style: {
                backgroundColor: '#17c3a2',
                color: 'white',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: '#f8f9fa',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#e9ecef',
                },
                '&:hover': {
                    backgroundColor: '#d6d8db',
                    cursor: 'pointer',
                },
                borderBottom: '1px solid #dee2e6',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#ffffff',
            }
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#f0f2f5',
                padding: '20px',
            }}
        >
            <ToastContainer position="top-center" autoClose={5000} theme="light" transition={Bounce} />
            <NavbarComponent />
            <div>
                <Container 
                className="mt-4"
                style={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    padding: '20px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: 'none',
                }}
                >

                    <div
                        style={{
                            backgroundColor: '#007bff',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '15px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '120%',
                        }}
                    >
                        Catálogo Usuario
                    </div>

                    <Button variant="primary" onClick={handleOpenModal}>
                        Agregar Registro
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
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="form-control w-25"
                                value={searchText}
                                onChange={handleSearch}
                            />
                        }
                        customStyles={customStyles}
                    />

                    <ModalForm
                        show={showModal}
                        handleClose={handleCloseModal}
                        idUsuario={selectedUsuario?.id || null}
                        usuarioData={selectedUsuario}
                        onSubmit={handleSubmitUsuario}
                    />
                </Container>
            </div>
        </div>
    );
};

export default Usuario;

