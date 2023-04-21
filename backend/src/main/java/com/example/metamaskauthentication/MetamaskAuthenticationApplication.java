package com.example.metamaskauthentication;

import com.example.metamaskauthentication.user.User;
import com.example.metamaskauthentication.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MetamaskAuthenticationApplication {
    @Bean
    public CommandLineRunner run(UserService userService) {
        return args ->{
           User user = new User("0xeAEaFf3797DE40D958B0B6282356A5e5d872216b");
            userService.register(user);
        };
    }
    public static void main(String[] args) {
        SpringApplication.run(MetamaskAuthenticationApplication.class, args);
    }

}
