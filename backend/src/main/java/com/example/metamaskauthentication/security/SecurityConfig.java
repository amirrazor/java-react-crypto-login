package com.example.metamaskauthentication.security;

import com.example.metamaskauthentication.registration.Web3AuthenticationProvider;
import com.example.metamaskauthentication.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

// SecurityConfig is a configuration class to set up the security configuration for the application
@Configuration
public class SecurityConfig {

    // Bean definition for an AuthenticationManager, which is used to authenticate users
    @Bean
    public AuthenticationManager auth(UserService userService) {
        return new ProviderManager(List.of(new Web3AuthenticationProvider(userService)));
    }

    // Bean definition for CORS configuration to allow requests from frontend
    @Bean
    public WebMvcConfigurer cors() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }

    // Bean definition for the SecurityFilterChain, which defines the security rules for HTTP requests
    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                // Permit all requests to the specified endpoints
                .requestMatchers(HttpMethod.POST, "/register/{address}").permitAll()
                .requestMatchers(HttpMethod.GET, "/challenge/{address}").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth").permitAll()
                .requestMatchers(HttpMethod.POST,"/update-username/*").permitAll()
                .requestMatchers(HttpMethod.GET,"/get-username/*").permitAll()
                // Require authentication for all other requests
                .anyRequest().authenticated()
                .and()
                // Disable form login, CSRF protection, and logout functionality
                .formLogin().disable()
                .csrf().disable()
                .logout().disable()
                // Configure the session management policy to be stateless
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Apply the CORS configuration
                .cors();

        return http.build();
    }
}