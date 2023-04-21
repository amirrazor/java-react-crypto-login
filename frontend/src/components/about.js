import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
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

                <header className="bg-dark py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 text-lg-left bg-text">
                                <h3 className="text-white font-weight-normal mb-3 text-center">I am</h3>
                                <h1 className="my-name text-uppercase mb-2 text-center" style={{ WebkitTextStroke: '2px #ffffff' }}>Amir Razagh-khah</h1>

                                <div className="text-white main-bio">
                                    <h3 className="text-white font-weight-normal mb-3">I have experience with</h3>
                                    <ul className="no-bullets">
                                        <li>Blockchain & Web3 development</li>
                                        <li>Fullstack dApp development & testing</li>
                                        <li>solidity, smart contracts, local & ejected test networks, Different layer 1 and layer 2 EVM compatible blockchains</li>
                                        <li>Ethers.js, Hardhat, Moralis, Next.js/React</li>
                                        <li>ERC-20 tokens, ERC-721 NFTs, OpenZeppelin</li>
                                        <li>Node.js, Web3, Gas efficiency, Aave, Programatic borrowing & lending</li>
                                        <li>Chainlink randomness, keeper, APIs/datalinks</li>
                                        <li>PHP, Postgre/MySQL, JavaScript/TypeScript</li>
                                        <li>Nginx/Apache web server management, Server management</li>
                                        <li>HTML, CSS, Bootstrap, Tailwind</li>
                                        <li>Google cloud, AWS, Linux command lines, Git</li>
                                    </ul>
                                </div>
                                <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            {/*  Header End  */}

            {/*  About Start  */}
                <div className="container-fluid py-5" id="about">
                    <div className="container">
                        <div className="position-relative d-flex align-items-center justify-content-center">
                            <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: '1px #dee2e6 '}} >About</h1>
                            <h1 className="position-absolute text-uppercase my-text-primary">About Me</h1>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-5 pb-4 pb-lg-0">
                            </div>
                            <div className="col-lg-7">
                                <h3 className="mb-4">Hi there!</h3>
                                <p>My name is Amir and I am a web3 developer. My focus is on creating fullstack dApps (decentralized apps), developing smart contracts, and contributing to the decentralized finance, AKA DeFi. </p>
                                <p>I finished my Master's in Digitalization, and my Master's thesis was about decentralized insurance with the use of smart contracts and blockchain. </p>
                                <p>When I have free time, I create educational videos about the crypto space. </p>
                                <p>If you have any questions or feedback or if you want to contact me for any business inquiries, feel free to contact me.</p>
                                <div className="row mb-3">
                                    <div className="col-sm-6 py-2">
                                        <h6>Name:
                                            <span className="text-secondary">Amir Razagh-khah</span>
                                        </h6>
                                    </div>

                                    <div className="col-sm-6 py-2">
                                        <h6>Degree:
                                            <span className="text-secondary">Master in Digitalization with a focus on blockchains</span>
                                        </h6>
                                    </div>
                                    <div className="col-sm-6 py-2">
                                        <h6>Experience in web3 and blockchains:
                                            <span className="text-secondary">3 Years</span>
                                        </h6>
                                    </div>
                                    <div className="col-sm-6 py-2">
                                        <h6>Experience in Web Development:
                                            <span className="text-secondary">15 Years</span>
                                        </h6>
                                    </div>
                                    <div className="col-sm-6 py-2">
                                        <h6>Email:
                                            <span className="text-secondary">cryptowithamir@gmail.com</span>
                                        </h6>
                                    </div>
                                    <div className="col-sm-6 py-2">
                                        <h6>Location:
                                            <span className="text-secondary">Germany</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About End */}
                {/* Qualification Start */}
                <div className="container-fluid py-5 bg-links" id="qualification">
                    <div className="container">
                        <div className="position-relative d-flex align-items-center justify-content-center">
                            <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: '1px #dee2e6'}}>Links</h1>
                            <h1 className="position-absolute text-uppercase my-text-primary">Social links & projects</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <h3 className="mb-4">Social links</h3>
                                <div className="border-left border-primary pt-2 pl-4 ml-2">


                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-warning">
                                            <a href="https://www.instagram.com/crypto.with.amir/"  className="text-white me-2 bi-instagram">Instagram</a>
                                        </button>
                                    </div>

                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-danger">
                                            <a href="https://www.youtube.com/channel/UCo1_p4Z1XELqyTCp_VBt6Aw"  className="text-white me-2 bi-youtube">YouTube</a>
                                        </button>
                                    </div>

                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-info">
                                            <a href="https://twitter.com/CryptoWithAmir"  className="text-white me-2 bi-twitter">Twitter</a>
                                        </button>
                                    </div>
                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-success">
                                            <a href="mailto:cryptowithamir@gmail.com"  className="text-white me-2 bi-envelope">E-mail</a>
                                        </button>
                                    </div>
                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-dark">
                                            <a href="https://github.com/amirrazor"  className="text-white bi-github">Github</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h3 className="mb-4">Web3 Projects</h3>
                                <div className="border-left border-primary pt-2 pl-4 ml-2">
                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-delotterize">
                                            <a href="https://delotterize.de"  className="text-white">Decentralized Lottery</a>
                                        </button>
                                    </div>
                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-decentrafund">
                                            <a href="https://decentrafund.de"  className="text-white">Decentralized Fundraiser</a>
                                        </button>
                                    </div>
                                    <div className="position-relative mb-4 buttons">
                                        <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                        <button className="font-weight-bold mb-1 btn btn-decentrafund">
                                            <a href="https://desurance.de"  className="text-white">Decentralized Insurance</a>
                                    </button>
                                </div>
                                <div className="position-relative mb-4 buttons">
                                    <i className="far fa-dot-circle text-primary position-absolute" style={{top: '2px', left: '-32px'}}></i>
                                    <button className="font-weight-bold mb-1 btn btn-decentrafund">
                                        <a href="https://github.com/amirrazor/programmatic-lending-borrowing"  className="text-white">Decentralized Lending & Borrowing</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                {/* Qualification End */}
                {/* Footer Start */}
            <div className="container-fluid bg-primary py-3">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-inline-flex align-items-center">
                                <h5 className="text-white mb-0">© 2023 Amir Razagh-khah</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/* Footer End */}

        </div>
    );
};

export default About;