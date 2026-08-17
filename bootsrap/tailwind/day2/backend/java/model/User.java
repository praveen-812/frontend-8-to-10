package com.technova.learninghub.model;

import java.time.LocalDateTime;

/**
 * User Entity for PostgreSQL / MySQL storage via Spring Data JPA
 */
public class User {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String passwordHash;
    private String role;
    private int xpPoints;
    private int streakDays;
    private LocalDateTime createdAt;

    public User() {}

    public User(Long id, String name, String email, String phone, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.xpPoints = 250;
        this.streakDays = 1;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public int getXpPoints() { return xpPoints; }
    public void setXpPoints(int xpPoints) { this.xpPoints = xpPoints; }
    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }
}
