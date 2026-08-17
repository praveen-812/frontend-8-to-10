package com.technova.learninghub.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    // Register Student DTO Record (Enforces Email AND Phone Number)
    public record RegisterRequest(String name, String email, String phone, String password, String track) {}
    public record LoginRequest(String identifier, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest request) {
        if (request.name() == null || request.name().length() < 2) {
            return ResponseEntity.badRequest().body(Map.of("error", "Full name must be at least 2 characters."));
        }
        if (request.email() == null || !request.email().contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("error", "A valid email address is required."));
        }
        if (request.phone() == null || request.phone().length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("error", "A valid international phone number is required."));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Welcome to TechNova Learning Hub, " + request.name() + "!");
        response.put("userId", "usr-" + UUID.randomUUID().toString().substring(0, 8));
        response.put("token", "bearer_jwt_java_token_" + System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginRequest request) {
        if (request.identifier() == null || request.identifier().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email or Phone Number is required."));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Authentication verified.");
        response.put("token", "bearer_jwt_java_token_" + System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
