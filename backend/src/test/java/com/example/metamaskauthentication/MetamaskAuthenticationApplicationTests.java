package com.example.metamaskauthentication;

import com.example.metamaskauthentication.registration.SignRequest;
import com.example.metamaskauthentication.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MetamaskAuthenticationApplicationTests {


    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    int randomServerPort;


    @Test
    void contextLoads() {
    }

    @Test
    void challengeEndpoint() {
        String address = "0xeAEaFf3797DE40D958B0B6282356A5e5d872216b";
        String url = "http://localhost:" + randomServerPort + "/challenge/" + address;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    void authEndpoint() {
        String address = "0xeAEaFf3797DE40D958B0B6282356A5e5d872216b";
        String signature = "0xca2dce5c19c45342c953771aea945cef8471926d75caade045f63e144f0fe7853ada77f8c6e5f9f641efb3a4ddff5e8a0582c90e7cdf725640085edcf0527a431c";
        SignRequest request = new SignRequest();
        request.setAddress(address);
        request.setSignature(signature);

        HttpEntity<SignRequest> httpEntity = new HttpEntity<>(request);

        ResponseEntity<Authentication> response = restTemplate.postForEntity("/auth", httpEntity, Authentication.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    void registerEndpoint() {
        String address = "0x1d5c89c4369b745bed6CC134F096fB5514008788";

        ResponseEntity<User> response = restTemplate.postForEntity("/register/" + address, null, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    void updateUsernameEndpoint() {
        String address = "0xeAEaFf3797DE40D958B0B6282356A5e5d872216b";
        String newUsername = "newUsername";

        Map<String, String> body = new HashMap<>();
        body.put("username", newUsername);

        HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(body);

        ResponseEntity<String> response = restTemplate.postForEntity("/update-username/" + address, httpEntity, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Username updated successfully");
    }

    @Test
    void getUsernameEndpoint() {
        String address = "0xeAEaFf3797DE40D958B0B6282356A5e5d872216b";

        ResponseEntity<String> response = restTemplate.getForEntity("/get-username/" + address, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

}
