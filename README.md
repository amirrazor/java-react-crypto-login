# Ethereum Authentication

This project demonstrates how to implement user authentication in a web application using Ethereum addresses, nonces, and signatures. Users can register, log in, and log out using their Ethereum address and MetaMask wallet. The project is built using a React frontend, and a Spring Boot backend.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- Register an Ethereum address as a user account
- Log in using Ethereum address and MetaMask wallet
- Log out of the application
- Update username associated with an Ethereum address

## Prerequisites
- Node.js
- Java 11+
- Maven

## Getting Started

### Backend Setup
1. Clone the repository:

```
git clone https://github.com/yourusername/ethereum-authentication.git
cd ethereum-authentication/backend
```

2. Configure the application:

Create an `application.properties` file in the `src/main/resources` directory with the following content:

```
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/ethereum_auth
spring.datasource.username=<your_database_username>
spring.datasource.password=<your_database_password>
```

Replace `<your_database_username>` and `<your_database_password>` with your MySQL database credentials.

3. Build and run the backend application:

```
mvn clean install
mvn spring-boot:run
```

The Spring Boot backend should now be running at http://localhost:8080.

### Frontend Setup
1. In a separate terminal, navigate to the frontend directory:

```
cd ethereum-authentication/frontend
```

2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

The React frontend should now be running at http://localhost:3000.

## Usage
1. Open your browser and navigate to http://localhost:3000.
2. Click "Login" in the top-right corner.
3. Click "Register" and confirm your Ethereum address in MetaMask.
4. Click "Sign In" and sign the nonce challenge in MetaMask.
5. You are now logged in! The page should display a welcome message with your username.
6. To log out, click "Logout" in the top-right corner.

## Testing
To run tests for the backend application, navigate to the backend directory and run:

```
mvn test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
