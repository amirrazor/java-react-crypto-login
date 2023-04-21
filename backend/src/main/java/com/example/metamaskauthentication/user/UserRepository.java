package com.example.metamaskauthentication.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

// Declare UserRepository as a Repository and define it as read-only for transactions
@Repository
@Transactional(readOnly = true)
// UserRepository extends JpaRepository to inherit basic CRUD operations for the User entity
public interface UserRepository extends JpaRepository<User, Long> {
    // Declare a method to find a User entity by its Ethereum address
    Optional<User> findByAddress(String address);
}