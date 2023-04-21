// Import required dependencies and components
import { useEffect, useState } from "react";
import React from 'react';
import "./App.css";
import Web3 from "web3";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/home';
import LoginPage from './components/login';
import AboutPage from './components/about';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWeb3Modal } from "./components/useWeb3Modal";

import "bootstrap/dist/css/bootstrap.css";

// Define provider options for Web3Modal
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: process.env.GOERLI_RPC_URL ,
        5: process.env.MAINNET_RPC_URL,
      },
    },
  },
};

// Initialize Web3Modal with provider options
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const App = () => {
  // Use the custom hook useWeb3Modal to manage wallet connections
  const [web3, account, connect] = useWeb3Modal(web3Modal);

  // Define state variables for the app
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [registerNotice, setRegisterNotice] = useState(null);

  // Check login status on component mount
  useEffect(() => {
    const loggedInLocalStorage = localStorage.getItem("loggedIn");
    const expirationLocalStorage = localStorage.getItem("expiration");
    const authMessageLocalStorage = localStorage.getItem("authMessage");
    const usernameLocalStorage = localStorage.getItem("username");
    const currentTime = Date.now();

    // If the user is logged in and the session hasn't expired, set the loggedIn state to true
    if (loggedInLocalStorage && expirationLocalStorage && currentTime < Number(expirationLocalStorage)) {
      setLoggedIn(true);
      if (authMessageLocalStorage) {
        setAuth(authMessageLocalStorage);
      }
      if (usernameLocalStorage) {
        setUserMessage(`Welcome ${usernameLocalStorage}!`);
      }
    } else {
      // If the expiration timestamp has passed, log out the user
      logout();
    }
  }, []);

  // Register user function
  const registerUser = async (address) => {
    try {
      const response = await fetch(`http://localhost:8080/register/${address}`, {
        method: "POST",
      });
      if (response.ok) {
        setRegisterNotice("User registered successfully");
      } else if (response.status === 409) {
        throw new Error("User already registered.");
      } else {
        throw new Error("Error registering user");
      }
    } catch (error) {
      setError(`Something went wrong: ${error.message}`);
    }
  };

  // Sign in function
  const sign = async () => {
    setAuthenticating(true);
    setError(null);
    setAuth(null);
    setUserMessage(null)
    setRegisterNotice(null)

    // Try connecting to the wallet
    try {
      await connect();
    } catch (error) {
      setError(`Error connecting to wallet: ${error.message}`);
      setAuthenticating(false);
      return;
    }

    // Check for a valid Web3 instance
    if (!web3) {
      setError("Web3 instance not found. Please check your wallet connection.");
      setAuthenticating(false);
      return;
    }

    // Get connected accounts and the current account
    const connectedAccounts = await web3.eth.getAccounts();
    const connectedAccount = connectedAccounts[0];

    // If an account is connected, authenticate the user
    if (connectedAccount) {
      try {
        const challenge = await fetch(`http://localhost:8080/challenge/${connectedAccount}`);
        if (challenge.status === 401 || challenge.status === 403) {
          throw new Error("This address is not registered");
        }

        const nonce = await challenge.text();
        const signature = await web3.eth.personal.sign(nonce, connectedAccount , "secret");
        const auth = await fetch(`http://localhost:8080/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signature: signature, address: connectedAccount }),
        });


        // If authentication is successful, update state and local storage
        if (auth.status === 200) {
          setAuth(`Successfully logged in with the address: ${connectedAccount}`);
          setLoggedIn(true);
          const expirationTimestamp = Date.now() + 60 * 60 * 1000;
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("expiration", expirationTimestamp);
          localStorage.setItem("authMessage", `Successfully logged in with the address: ${connectedAccount}`);
          const username = await getUsername(connectedAccount);
          if (username) {
            localStorage.setItem("username", username);
            setUserMessage(`Welcome ${username}!`);
          }
        } else {
          throw new Error(`The API returned ${auth.status}..`);
        }
      } catch (error) {
        setError(`Something went wrong: ${error.message}`);
      }
      setAuthenticating(false);
    } else {
      setError(`Error connecting to wallet: ${error.message}`);
    }
  };

  const getUsername = async (address) => {
    try {
      const response = await fetch(`http://localhost:8080/get-username/${address}`);
      if (response.ok) {
        const username = await response.text();
        return username || null;
      } else {
        throw new Error("Error getting username");
      }
    } catch (error) {
      setError(`Something went wrong: ${error.message}`);
    }
  };

  // Logout function
  const logout = () => {
    setAuth(null);
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("expiration");
    localStorage.removeItem("authMessage");
    setUserMessage(null)
    setRegisterNotice(null)
  };

// Render the app with routes for different components
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
              path="/login"
              render={(props) => (
                  <LoginPage
                      account={account}
                      connect={connect}
                      web3={web3}
                      Web3={Web3}
                      sign={sign}
                      error={error}
                      auth={auth}
                      loggedIn={loggedIn}
                      logout={logout}
                      authenticating={authenticating}
                      registerUser={registerUser}
                      registerNotice={registerNotice}
                      userMessage={userMessage}
                      {...props}
                  />
              )}
          />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </Router>
  );
}

export default App;