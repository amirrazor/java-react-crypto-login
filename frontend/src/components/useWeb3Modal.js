import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

export const useWeb3Modal = (web3Modal) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);

    const connect = useCallback(async () => {
        try {
            const provider = await web3Modal.connect();
            const web3Instance = new Web3(provider);

            // Listen for account changes and update the connected account
            provider.on("accountsChanged", async (accounts) => {
                setAccount(accounts[0]);
            });

            setWeb3(web3Instance);
        } catch (error) {
            console.log("Error connecting to wallet:", error.message);
        }
    }, [web3Modal]);

    const disconnect = useCallback(async () => {
        if (web3Modal.cachedProvider) {
            await web3Modal.clearCachedProvider();
        }
        setWeb3(null);
        setAccount(null);
    }, [setWeb3, setAccount, web3Modal]);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect();
        }
    }, [connect, web3Modal.cachedProvider]);

    useEffect(() => {
        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                setAccount(accounts[0]);
            });
        }
    }, [web3]);

    return [web3, account, connect, disconnect, setAccount];
};