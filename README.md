# Java React Crypto Login

This project demonstrates how to implement user authentication in a web application using Ethereum addresses, nonces, and signatures. Users can register, log in, and log out using their Ethereum address and MetaMask wallet. users can stay logged in for a period of time even upon browser reload. Additionally, after the user has been authenticated and successfully logged in, they can enter their Username and it will be stored in the mysql database. The project is built using a React as frontend, and Java Spring Boot as backend. MySQL is used for a database.

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
- Stay logged in for a period of time
- Log out of the application
- Update username associated with an Ethereum address

## Prerequisites
- Node.js
- Java 11+
- Maven
- MySQL
- IntelliJ IDEA (Not mandatory but recommanded)

## Getting Started

### Backend Setup
1. Clone the repository:

```
git clone https://github.com/yourusername/ethereum-authentication.git
cd java-react-crypto-login/backend
```

2. Configure the application:

Change `application.properties` to `application.yml` in the `src/main/resources` directory with the following content:

```
server:
  error:
    include-message: always
    include-binding-errors: always

spring:
  datasource:
    password: <your_mysql_password>
    url: jdbc:mysql://localhost:3306/<your_database_name>
    username: <your_mysql_username>
  jpa:
    hibernate:
      ddl-auto: create-drop
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
    show-sql: true
```

Replace `<your_database_username>` and `<your_database_password>` with your MySQL credentials. Create a databse in MySQL and change the `<your_database_name>` with the chosen name. `ddl-auto: create-drop` drops the created user table each time the application is rerun. This is ideal for testing purposes.


3. Build and run the backend application:

```
mvn clean install
mvn spring-boot:run
```

The Spring Boot backend should now be running at http://localhost:8080.

### Frontend Setup
1. In a separate terminal, navigate to the frontend directory:

```
cd java-react-crypto-login/frontend
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
3. Click "Register" and confirm your Ethereum address in MetaMask. Your address will be stored in the database along with a nonce
4. Click "login" and sign the nonce challenge in MetaMask. Your crypto account along with the nonce you sign, will create a signature which will work like a password for authentication. This signature will stya the same everytime you log in.
5. You are now logged in! Add a Username if you like
6. The page should display a welcome message with your username the next time you log in or if you reload the browser.
7. To log out, simply click "Logout"

## Testing
To run tests for the backend application, navigate to the backend directory and run:

```
mvn test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
