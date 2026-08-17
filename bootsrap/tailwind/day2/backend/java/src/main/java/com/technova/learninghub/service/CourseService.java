package com.technova.learninghub.service;

import com.technova.learninghub.model.Course;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {

    public List<Course> getCoursesByDepartment(String department) {
        // Business logic & filtering
        return List.of(
            new Course("course-html-css", "Modern HTML5 & CSS3 Masterclass", "fullstack", "Beginner", "18 Hours", 42, 4.9, "Marcus Vance", "Master modern HTML5 and CSS3 Grid/Flexbox."),
            new Course("course-genai-llm", "Generative AI, LLMs & Prompt Engineering", "ai", "Intermediate", "30 Hours", 55, 5.0, "Sofia Alvarez", "Build applications using LLMs and Vector Databases.")
        );
    }
}
