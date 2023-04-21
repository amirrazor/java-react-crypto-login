package com.example.metamaskauthentication.registration;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnknownAddress extends RuntimeException {
    public UnknownAddress(String address) {
        super("Wallet address " + address + " is not known");
    }
}