package com.technova.learninghub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    public record CourseSummary(String id, String title, String department, String level, double rating, int lessons) {}

    @GetMapping
    public ResponseEntity<List<CourseSummary>> getAllCourses(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String level) {
        
        List<CourseSummary> courses = List.of(
            new CourseSummary("course-html-css", "Modern HTML5 & CSS3 Masterclass", "fullstack", "Beginner", 4.9, 42),
            new CourseSummary("course-js-es6", "Modern JavaScript (ES6+) & DOM Mastery", "fullstack", "Beginner - Intermediate", 4.9, 58),
            new CourseSummary("course-python-fastapi", "Full-Stack Python & FastAPI Backend API", "fullstack", "Intermediate", 4.9, 64),
            new CourseSummary("course-java-spring", "Enterprise Java & Spring Boot Microservices", "fullstack", "Intermediate", 4.9, 72),
            new CourseSummary("course-genai-llm", "Generative AI, LLMs & Prompt Engineering", "ai", "Intermediate", 5.0, 55),
            new CourseSummary("course-ai-agents", "Autonomous AI Agents & Multi-Agent Systems", "ai", "Intermediate", 4.9, 52)
        );

        if (department != null && !department.isBlank()) {
            courses = courses.stream().filter(c -> c.department().equalsIgnoreCase(department)).toList();
        }

        return ResponseEntity.ok(courses);
    }
}
