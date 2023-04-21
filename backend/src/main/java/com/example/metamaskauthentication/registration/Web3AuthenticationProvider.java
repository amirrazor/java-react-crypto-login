package com.example.metamaskauthentication.registration;

import org.springframework.security.authentication.AuthenticationProvider;
import com.example.metamaskauthentication.user.User;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;
import com.example.metamaskauthentication.user.UserService;
import java.math.BigInteger;

// Web3AuthenticationProvider implements
// AuthenticationProvider to provide authentication using Web3 signatures
@Component
public class Web3AuthenticationProvider implements AuthenticationProvider {
    private final UserService userService;

    // Constructor to inject UserService for accessing user data
    public Web3AuthenticationProvider(UserService userService) {
        this.userService = userService;
    }

    // Check if the signature is valid for the given address and nonce
    private boolean valid(String signature, String address, String nonce) throws Exception {
        String r = signature.substring(0, 66);
        String s = "0x" + signature.substring(66, 130);
        String v = "0x" + signature.substring(130, 132);

        Sign.SignatureData data = new Sign.SignatureData(
                Numeric.hexStringToByteArray(v),
                Numeric.hexStringToByteArray(r),
                Numeric.hexStringToByteArray(s)
        );

        BigInteger key = Sign.signedPrefixedMessageToKey(nonce.getBytes(), data);
        return matches(key, address);
    }

    // Compare the recovered Ethereum address from the signature with the given address
    private boolean matches(BigInteger key, String address) {
        return ("0x" + Keys.getAddress(key).toLowerCase()).equals(address.toLowerCase());
    }

    // Authenticate a user based on their Ethereum address and signature
    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        User user = userService.findByAddress(authentication.getName())
                .orElseThrow(() ->
                        new BadCredentialsException
                                (authentication.getName() + " is not allowed to log in."));

        String signature = authentication.getCredentials().toString();
        try {
            if (valid(signature, user.getAddress(), user.getNonce())) {
                return new Web3Authentication(user.getAddress(), signature);
            }
        } catch (Exception e) {
            throw new BadCredentialsException
                    (authentication.getName() + " is not allowed to log in.", e);
        }

        throw new BadCredentialsException(authentication.getName()
                + " is not allowed to log in.");
    }

    // Specify that this AuthenticationProvider supports Web3Authentication
    @Override
    public boolean supports(Class<?> authentication)
    {
        return Web3Authentication.class.equals(authentication);
    }
}