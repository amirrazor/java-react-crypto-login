package com.example.metamaskauthentication.user;

import com.example.metamaskauthentication.registration.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

// Declare UserService as a Service and use Lombok to generate a constructor
@Service
@AllArgsConstructor
// Enable transactions for the UserService
@Transactional
public class UserService {
    // Inject UserRepository as a dependency
    private final UserRepository userRepository;



    // Method to register a new User entity using its Ethereum address
    public User registerUser(String address) {
        Optional<User> existingUser = userRepository.findByAddress(address);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User already registered.");
        } else {
            User newUser = new User(address);
            return userRepository.save(newUser);
        }
    }


    // Method to save a new User entity
    public void register(User user) {
        userRepository.save(user);
    }

    // Method to find a User entity by its Ethereum address
    public Optional<User> findByAddress(String address) {
        return userRepository.findByAddress(address);
    }




    // Method to update a User entity's username using its Ethereum address
    public User updateUserUsername(String address, String username) {
        Optional<User> userOptional = userRepository.findByAddress(address);
        if (!userOptional.isPresent()) {
            throw new NotFoundException("User not found");
        }

        User user = userOptional.get();
        user.setUsername(username);
        userRepository.save(user);

        return user;
    }
}