import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown, Form, FormControl, ListGroup } from 'react-bootstrap';
import { FaSignOutAlt, FaHome, FaUsers, FaUserTie, FaUserCog, FaSignInAlt, FaHandHoldingUsd, FaRegHandshake, FaRegBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { reactLocalStorage } from 'reactjs-localstorage';

const components = [
    { name: "Inicio", path: "/home", icon: <FaHome className="me-2 text-primary" /> },
    { name: "Visitas", path: "/Accesos", icon: <FaUsers className="me-2 text-primary" /> },
    { name: "Colaboradores", path: "/colaborador", icon: <FaUserTie className="me-2 text-primary" /> },
    { name: "Usuarios", path: "/usuario", icon: <FaUserCog className="me-2 text-primary" /> },
    { name: "Ingreso", path: "/ingreso", icon: <FaSignInAlt className="me-2 text-primary" /> },
    { name: "Unidad", path: "/Unidad", icon: <FaRegBuilding className="me-2 text-primary" /> },
    // { name: "Acuerdo Gubernativo", path: "/AcuerdoGubernativo", icon: <FaHandHoldingUsd className="me-2 text-primary" /> },
    // { name: "Acuerdo Ministerial", path: "/AcuerdoMinisterial", icon: <FaRegHandshake className="me-2 text-primary" /> },
];

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const permission = reactLocalStorage.getObject("permision");
        setHasPermission(true);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);

        if (query.length === 0) {
            setFilteredComponents([]);
            return;
        }

        const results = components.filter(component => 
            component.name.toLowerCase().includes(query)
        );
        setFilteredComponents(results);
    };

    const handleSelect = (path) => {
        navigate(path);
        setSearch('');
        setFilteredComponents([]);
    };

    const handleLogout = async () => {
        try {
            const storedData = reactLocalStorage.getObject("id");
            const id = storedData.user_id;
            await logout(id);
            reactLocalStorage.clear();
            navigate('/');
        } catch (error) {
            console.log("[ERROR] >>", error);
        }
    };

    return (
        <Navbar expand="lg" className="bg-white shadow-sm rounded px-3" style={{ backdropFilter: 'blur(10px)' }}>
            <Container fluid>
                <Navbar.Brand>
                    <img src="/img/logo.png" alt="Logo" className="img-fluid" style={{ width: '150px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        {components.slice(0, 2).map((item, index) => (
                            <Nav.Link key={index} className="fw-bold text-dark mx-2" onClick={() => navigate(item.path)}>
                                {item.icon} {item.name}
                            </Nav.Link>
                        ))}
                        
                        {hasPermission && (
                            <Dropdown drop="end" className="mx-2">
                                <Dropdown.Toggle variant="light" className="fw-bold shadow-sm border">
                                    Catálogos
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="shadow-lg">
                                    {components.slice(2).map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => navigate(item.path)}>
                                            {item.icon} {item.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>

                    <Form className="d-flex position-relative mx-3" style={{ maxWidth: '300px' }}>
                        <FormControl
                            type="search"
                            placeholder="Buscar..."
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={handleSearchChange}
                            style={{ borderRadius: '20px' }}
                        />
                        {filteredComponents.length > 0 && (
                            <ListGroup className="position-absolute w-100 shadow mt-1" style={{ zIndex: 1000, top: '100%' }}>
                                {filteredComponents.map((component, index) => (
                                    <ListGroup.Item 
                                        key={index} 
                                        action 
                                        onClick={() => handleSelect(component.path)}
                                        className="d-flex align-items-center"
                                    >
                                        {component.icon} {component.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form>

                    <div
                        className="logout-container d-flex align-items-center justify-content-center"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }}
                    >
                        <div 
                            className="logout-button d-flex align-items-center justify-content-center"
                            style={{
                                width: hover ? '100px' : '40px',
                                height: '40px',
                                backgroundColor: '#dc3545',
                                borderRadius: hover ? '20px' : '50%',
                                transition: 'all 0.3s ease',
                                paddingLeft: hover ? '35px' : '0',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {hover && (
                                <span className="text-white fw-bold me-2" style={{ fontSize: '14px' }}>Salir</span>
                            )}
                            <FaSignOutAlt 
                                size={20} 
                                style={{ 
                                    color: 'white', 
                                    transition: 'transform 0.3s ease',
                                    transform: hover ? 'translateX(-5px)' : 'translateX(0)'
                                }}
                            />
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;