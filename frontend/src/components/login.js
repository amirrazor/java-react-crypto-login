import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

// LoginPage component handles the login functionality
const LoginPage = ({web3,
                       account,
                       sign,
                       wallet,
                       error,
                       auth,
                       loggedIn,
                       logout,
                       authenticating,
                       registerUser,
                       registerNotice,
                       userMessage,
                       connect}) => {
    //state variable for updating the username after login
    const [username, setUsername] = useState("");

    // function to handle login action
    const handleLogin = async () => {
        if (!web3) {
            await connect();
        }
        sign();

    };

    // Function to handle logout action
    const handleLogout = async () => {
        logout();
    };

    // the function to handle updating the username after login

    const handleUsernameUpdate = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/update-username/${account}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                }
            );
            if (response.ok) {
                document.getElementById("userSubmitted").innerHTML =
                    "The username is successfully submitted";
            } else {
                alert("Error updating username");
            }
        } catch (error) {
            alert(`Something went wrong: ${error.message}`);
        }
    };

    // Render the LoginPage component

    return (
        <div>
            {/* Render the navigation bar */}
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
            {/* Display error message if it exists */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Display authentication message if it exists */}
            {auth && <div className="alert alert-success">{auth}</div>}
            {/* Display successful registration */}
            {registerNotice && <div className="alert alert-success">{registerNotice}</div>}
            {/* Display welcome user message */}
            {userMessage && <div className="ms-5">{userMessage}</div>}
            {/* Render the login/logout button */}
            <button
                disabled={authenticating}
                onClick={loggedIn ? handleLogout : () => handleLogin(wallet)}
                className="btn btn-success m-5"
            >
                <span>{loggedIn ? "Logout" : "Login"}</span>
            </button>

            {/* updating the username input and button */}
            {loggedIn && (
                <div>
                    <div className="m-2">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    </div>

                        <div className="m-2">
                    <button onClick={handleUsernameUpdate} className="btn btn-primary ml-2">
                        Submit Username
                    </button>
                        </div>
                    <span id="userSubmitted" className=""></span>
                </div>

            )}


            {/* Render the register link */}
            <div className="m-5">
                Have not registered yet?{' '}
                <Link
                    to="#"
                    onClick={(e) => {
                        e.preventDefault();
                        registerUser(account);
                    }}
                >
                    click here to Register
                </Link>
            </div>
        </div>

    );
};

export default LoginPage;