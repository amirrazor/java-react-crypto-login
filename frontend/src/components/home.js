import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Crypto Auth</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/about">About developer</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Welcome to Crypto Auth</h1>
                        <p>
                            Crypto Auth is a login and registration project that works with crypto wallets and addresses. Using this method of authentication and login provides many advantages, such as increased security and decentralization.
                        </p>
                        <p>
                            This project is built using Java and Spring Boot for the backend and React and Bootstrap for the frontend. By leveraging these technologies, we can create a modern and responsive web application that is easy to use and maintain.
                        </p>
                    </Col>
                </Row>
            </Container>
            <footer className="mt-5 py-3 bg-light text-center">
                <p>
                    All rights reserved: <a href="https://crypto-amir.com">Crypto Amir</a>
                </p>
            </footer>
        </div>
    );
};

export default Homepage;