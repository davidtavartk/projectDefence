import React from 'react';
import { Navbar, Nav, Container, Button, Form, Dropdown } from 'react-bootstrap';
import routePaths from '../routes/routePaths';
import userIcon from '../images/userIcon.png';
import logo from '../images/logo.png';
import globe from '../images/globe.png'
import menu from '../images/menu.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';



const AppNavbar = () => {
    const navbarLogo = <img src={logo} alt="Logo" className='navbar-logo' />;
    const buttonIcon = <img src={userIcon} alt="User" className='navbar-icon' />;
    const globeIcon = <img src={globe} alt="User" className='navbar-icon' />;
    const menuIcon = <img src={menu} alt="menu" className='navbar-icon' />;

    const navigate = useNavigate();

    const [user, setUser] = useState('Guest');


    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setUser(decodedToken.username);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <Navbar expand="lg" className="navbar border bg-body-tertiary" fixed="top">
            <Container>
                <Nav>
                    <Navbar.Brand href={routePaths.Home}> {navbarLogo}</Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>

                    <Nav className="m-auto ">
                        <Nav.Link href={routePaths.Home} className='nav-link rounded-5'>Home</Nav.Link>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Nav>

                    <Nav className='Settings'>
                        <Nav.Link href={routePaths.MyCollection} className='nav-link rounded-5'> My Collection </Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} variant='d-flex outline rounded-5 icon' id="logo-dropdown" className='dropdown-toggle'>
                                {globeIcon}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/about">English</Dropdown.Item>
                                <Dropdown.Item href="/contact">Russian</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Button} id='user-menu' variant="outline border rounded-5">
                                {menuIcon} {buttonIcon} <span className="user-span">{user}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                    {user ? (
                                        <>
                                            <Dropdown.Item onClick={() => navigate(routePaths.MyCollection)}>My Collection</Dropdown.Item>
                                            <Dropdown.Divider className="dropdown-divider" />
                                            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Dropdown.Item onClick={() => navigate(routePaths.Login)}>Login</Dropdown.Item>
                                            <Dropdown.Divider className="dropdown-divider" />
                                            <Dropdown.Item onClick={() => navigate(routePaths.Registration)}>Sign Up</Dropdown.Item>
                                        </>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;