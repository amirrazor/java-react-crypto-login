package com.example.metamaskauthentication.user;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

// Define getters, setters, equals, hashCode, and a no-args constructor using Lombok annotations
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor

// Mark the class as an entity for the persistence framework
@Entity
public class User {

    // Declare the primary key and use the GenerationType.IDENTITY strategy for the ID generation
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Store the user's Ethereum address
    private String address;

    // Store the user's username, null at first
    private String username;

    // Store a unique nonce for the user, initialized with a random UUID
    private String nonce = UUID.randomUUID().toString();

    private Boolean enabled = true;
    private Boolean locked = true;

    // Store the user's role as an Enum type
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    // Store the timestamp when the user was created
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructor for creating a new user with their Ethereum address
    public User(String address) {
        this.address = address;
        this.username = "";
        this.enabled = true;
        this.locked = true;
        this.userRole = userRole.USER;
    }

    // Getter for the user's Ethereum address
    public String getAddress() {
        return address;
    }

    // Getter for the user's nonce
    public String getNonce() {
        return nonce;
    }
}