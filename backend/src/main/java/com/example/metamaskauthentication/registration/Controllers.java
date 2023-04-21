package com.example.metamaskauthentication.registration;

import com.example.metamaskauthentication.user.NotFoundException;
import com.example.metamaskauthentication.user.User;
import com.example.metamaskauthentication.user.UserRepository;
import com.example.metamaskauthentication.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class Controllers {

    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public Controllers(UserService userService, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }



    // Endpoint to register a new user with their Ethereum address
    @PostMapping("/register/{address}")
    public ResponseEntity<User> register(@PathVariable String address) {
        User registeredUser = userService.registerUser(address);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }



    // Endpoint to get the challenge nonce for a given Ethereum address
    @GetMapping("/challenge/{address}")
    public String challenge(@PathVariable String address) {
        Optional<User> userOptional = userService.findByAddress(address);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getNonce();
        } else {
            throw new UnknownAddress(address);
        }
    }

    // Endpoint to authenticate a user with their Ethereum address and signature
    @PostMapping("/auth")
    public Authentication auth(@RequestBody SignRequest request) {
        return authenticationManager.authenticate(
                new Web3Authentication(request.getAddress(),
                        request.getSignature()));
    }





    // Endpoint to update a user's username using their Ethereum address
    @PostMapping("/update-username/{address}")
    public ResponseEntity<?> updateUsername(@PathVariable String address,
                                            @RequestBody Map<String,String> body) {
        String username = body.get("username");
        if (username == null) {
            return ResponseEntity.badRequest().body("Invalid username");
        }

        try {
            User updatedUser = userService.updateUserUsername(address, username);
            return ResponseEntity.ok("Username updated successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Endpoint to get a user's username using their Ethereum address
    @GetMapping("/get-username/{address}")
    public ResponseEntity<?> getUsername(@PathVariable String address) {
        Optional<User> userOptional = userRepository.findByAddress(address);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOptional.get();
        return ResponseEntity.ok(user.getUsername());
    }
}



