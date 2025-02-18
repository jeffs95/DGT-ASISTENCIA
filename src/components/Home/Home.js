import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import NavbarComponent from '../NavbarComponent';
import { getAsistenciaHoy, updateAsistencia, crearListaAsistencia } from '../../services/asistencia';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loading from '../Loading';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";

const customStyles = {
    table: { style: { backgroundColor: '#ffffff' } },
    headRow: { style: { backgroundColor: '#17c3a2', color: '#fff', fontWeight: 'bold' } },
    rows: { style: { backgroundColor: '#f8f9fa', '&:nth-of-type(odd)': { backgroundColor: '#e9ecef' } } },
    pagination: { style: { backgroundColor: '#ffffff' } }
};

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loadingAccion, setLoadingAccion] = useState(null);
    const [searchText, setSearchText] = useState('');
    const location = useLocation();
    
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
            console.error('Error al obtener las asistencias:', error);
        } finally {
        }
    };

    useEffect(() => {
        if (location.state?.dataParams) {
            toast.success("Bienvenido al Sistema de Administracion", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce
            });
        }
    }, [location.state]);

    useEffect(() => {
        fetchData();
    }, []);

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
        { name: 'Nombre Completo', selector: row => row.colaborador.nombre, sortable: true },
        { name: 'Apellido', selector: row => row.colaborador.apellido, sortable: true },
        { name: 'Tipo Colaborador', selector: row => row.colaborador.tipo_colaborador, sortable: true },
        {
            name: 'Fecha Ingreso',
            selector: row => row.fecha_ingreso ? `${row.fecha_ingreso} ${row.hora_ingreso}` : (
                <button
                    onClick={() => handleAsistencia(row, 'ingreso')}
                    className="btn btn-success"
                    disabled={loadingAccion === row.id}
                >
                    {loadingAccion === row.id ? <Loading size="sm" /> : 'Ingreso'}
                </button>
            )
        },
        {
            name: 'Fecha Egreso',
            selector: row => row.fecha_egreso ? `${row.fecha_egreso} ${row.hora_egreso}` : (
                row.fecha_ingreso && (
                    <button
                        onClick={() => handleAsistencia(row, 'egreso')}
                        className="btn btn-danger"
                        disabled={loadingAccion === row.id}
                    >
                        {loadingAccion === row.id ? <Loading size="sm" /> : 'Egreso'}
                    </button>
                )
            )
        }
    ];

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter(item =>
            item.colaborador.nombre.toLowerCase().includes(value)
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
                        <span>Registro de Asistencias</span>
                    </div>

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
                </Container>
            </div>
        </div>
    );
};

export default Home;
