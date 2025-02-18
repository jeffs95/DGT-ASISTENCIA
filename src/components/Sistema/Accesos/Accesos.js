import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import NavbarComponent from '../../NavbarComponent';
import Sidebar from '../../Home/components/Sidebar';
import { getListaAcceso, EditarAcceso, crearAcceso, getDocumento } from '../../../services/acceso';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../../Loading';
import ModalForm from './components/ModalForm'; 
import 'react-toastify/dist/ReactToastify.css';
import ModalPreview from './components/ModalPreview';
import { reactLocalStorage } from 'reactjs-localstorage';

const customStyles = {
    table: { style: { backgroundColor: '#ffffff' } },
    headRow: { style: { backgroundColor: '#17c3a2', color: '#fff', fontWeight: 'bold' } },
    rows: { style: { backgroundColor: '#f8f9fa', '&:nth-of-type(odd)': { backgroundColor: '#e9ecef' } } },
    pagination: { style: { backgroundColor: '#ffffff' } }
};

const Accesos = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAccion, setLoadingAccion] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getListaAcceso();
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error al obtener los accesos:', error);
        } finally {
            setLoading(false);
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
    }
    
    const handleCreateAcceso = async (params) => {
        try {
            const authData = reactLocalStorage.getObject('var');
            const response = await crearAcceso(params);
            toast.success("Acceso creado correctamente");
            fetchData();
        } catch (error) {
            toast.error("Error al crear el acceso");
        }
    };

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, maxWidth: '5px' },
        { name: 'Nombre Completo', selector: row => row.visitante.nombre_completo, sortable: true },
        { name: 'Cui', selector: row => row.visitante.cui, sortable: true },
        { name: 'Tipo Ingreso', selector: row => row.ingreso.nombre, sortable: true },
        {
            name: 'Hora  Egreso',
            selector: row => row.fecha_egreso ? `${row.fecha_egreso} ${row.hora_egreso}` : (
                row.fecha_ingreso && (
                    <button
                        onClick={() => handleAcceso(row, 'egreso')}
                        className="btn btn-danger"
                        disabled={loadingAccion === row.id}
                    >
                        {loadingAccion === row.id ? <Loading size="sm" /> : 'Egreso'}
                    </button>
                )
            )
        },
        {
            name: 'Detalle Registro',
            selector: row => row.id && (
                    <button
                        onClick={() => handleAccess(row)}
                        className="btn btn-success"
                        disabled={loadingAccion === row.id}
                    >
                        {loadingAccion === row.id ? <Loading size="sm" /> : 'Ver'}
                    </button>
                )
        }
    ];

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter(item =>
            item.visitante.nombre_completo.toLowerCase().includes(value) || 
            item.visitante.cui.toLowerCase().includes(value) ||
            item.ingreso.nombre.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
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
                    <div style={{
                            backgroundColor: '#007bff',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '15px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '120%',
                        }}>
                        <span>Registro de Visitantes</span>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                        style={{ marginBottom: '20px' }}
                    >
                        Crear Registro
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
                        subHeaderComponent={<input type="text" placeholder="Buscar..." className="form-control w-25" value={searchText} onChange={handleSearch} />}
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
