package com.technova.learninghub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TechNova Learning Hub - Enterprise Spring Boot Backend Application
 * Powers RESTful services for Student Authentication (Email & Phone),
 * Course Catalog Management, Enrollment, and Certificate Generation.
 */
@SpringBootApplication
public class TechNovaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechNovaApplication.class, args);
        System.out.println("🚀 TechNova Spring Boot API Server running on port 8080");
    }
}
