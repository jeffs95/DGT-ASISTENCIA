import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import NavbarComponent from '../../NavbarComponent';
import { Container, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getListaIngreso, crearIngreso, EditarIngreso, EliminarIngreso} from '../../../services/ingreso';
import ModalForm from './components/ModalForm';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ingreso = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedIngreso, setSelectedIngreso] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getListaIngreso();
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error al obtener ingresos:', error);
        }
    };

    const handleOpenModal = (ingresoData = null) => {
        setSelectedIngreso(ingresoData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedIngreso(null);
        setShowModal(false);
    };

    const handleSubmitColaborador = async (ingresoData, idIngreso) => {
        try {
            if (idIngreso) {
                await EditarIngreso(idIngreso, ingresoData);
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
                await crearIngreso(ingresoData);
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
            console.error('Error al guardar ingresoData:', error);
            toast.error('Ocurrió un problema!', {
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
    };

    const handleEliminate = async (row) => {
        try {
            const id = row.id; 
            const response = await EliminarIngreso(id);
            console.log('[response]', response);
            
        } catch (error) {
            console.log('[ERROR] >>', error);
            
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter(item =>
            item.id.toString().includes(value) ||
            item.nombre.toLowerCase().includes(value) ||
            item.correlativo.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'NOMBRE', selector: row => row.nombre, sortable: true },
        { name: 'CORRELATIVO', selector: row => row.correlativo, sortable: true },
        {
            name: 'ACCIONES',
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
                    <div style={{ backgroundColor: '#007bff', padding: '10px', borderRadius: '5px', marginBottom: '15px', color: '#fff', fontWeight: 'bold', fontSize: '120%' }}>
                    Catálogo Ingreso
                    </div>

                    <Button variant="primary" onClick={handleOpenModal}>
                        Agregar
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
                        idIngreso={selectedIngreso?.id || null}
                        colaboradorData={selectedIngreso}
                        onSubmit={handleSubmitColaborador}
                    />
                </Container>
            </div>
        </div>
    );
};

export default Ingreso;
