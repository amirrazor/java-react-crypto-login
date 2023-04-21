package com.example.metamaskauthentication.registration;

import org.springframework.security.authentication.AbstractAuthenticationToken;

// Web3Authentication extends AbstractAuthenticationToken to represent
// an authentication request for Web3 authentication
public class Web3Authentication extends AbstractAuthenticationToken {

    private final String address; // Ethereum address of the user
    private final String signature; // Signature provided by the user

    // Constructor to initialize the Ethereum address and signature
    public Web3Authentication(String address, String signature) {
        super(null);
        this.address = address;
        this.signature = signature;
    }

    // Return the Ethereum address as the principal, which is the user's identity
    @Override
    public Object getPrincipal() {
        return address;
    }

    // Return the signature as the credentials, which proves the user is who he claims to be
    // The signature is made of a hash of the private key of the address that sings the nonce
    @Override
    public Object getCredentials() {
        return signature;
    }
}