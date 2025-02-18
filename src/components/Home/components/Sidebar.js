import React from 'react';
import { Offcanvas, Nav, Dropdown, Button } from 'react-bootstrap';
import { FaHome, FaUsers, FaUserTie, FaUserCog, FaSignInAlt, FaHandHoldingUsd, FaRegHandshake, FaRegBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar = () => {
    const { isCollapsed } = useSidebar();
    const navigate = useNavigate();

    return (
        <Offcanvas
            show={true}
            backdrop={false}
            scroll={true}
            style={{
                width: isCollapsed ? '80px' : '250px',
                height: '100vh',
                transition: 'width 0.3s ease',
                backgroundColor: '#ffffff',
                color: '#000',
            }}
        >
            <Offcanvas.Header>
                <Offcanvas.Title>
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className="img-fluid"
                        style={{
                            width: '220px',
                            height: 'auto',
                            display: isCollapsed ? 'none' : 'block',
                        }}
                    />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link className="d-flex align-items-center fw-bold text-dark" onClick={() => navigate('/home')}>
                            <FaHome className="me-2" />
                            <span className={`d-inline-block ${isCollapsed ? 'd-none' : ''}`}>Inicio</span>
                        </Nav.Link>
                        <Nav.Link className="d-flex align-items-center fw-bold text-dark" onClick={() => navigate('/Accesos')}>
                            <FaUsers className="me-2" />
                            <span className={`d-inline-block ${isCollapsed ? 'd-none' : ''}`}>Visitas</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Dropdown className="w-100">
                        <Dropdown.Toggle variant="light" className="w-100 text-start fw-bold">
                            <span className={`d-inline-block ${isCollapsed ? 'd-none' : ''}`}>Catálogos</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item onClick={() => navigate('/colaborador')}>
                                <FaUserTie className="me-2 text-primary" /> Colaboradores
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/usuario')}>
                                <FaUserCog className="me-2 text-primary" /> Usuarios
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/ingreso')}>
                                <FaSignInAlt className="me-2 text-primary" /> Ingreso
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/Unidad')}>
                                <FaRegBuilding className="me-2 text-primary" /> Unidad
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/AcuerdoGubernativo')}>
                                <FaHandHoldingUsd className="me-2 text-primary" /> Acuerdo Gubernativo
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/AcuerdoMinisterial')}>
                                <FaRegHandshake className="me-2 text-primary" /> Acuerdo Ministerial
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;
