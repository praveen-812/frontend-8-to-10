package com.technova.learninghub.model;

public class Course {
    private String id;
    private String title;
    private String department;
    private String level;
    private String duration;
    private int lessonsCount;
    private double rating;
    private String instructor;
    private String summary;

    public Course() {}

    public Course(String id, String title, String department, String level, String duration, int lessonsCount, double rating, String instructor, String summary) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.level = level;
        this.duration = duration;
        this.lessonsCount = lessonsCount;
        this.rating = rating;
        this.instructor = instructor;
        this.summary = summary;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public int getLessonsCount() { return lessonsCount; }
    public void setLessonsCount(int lessonsCount) { this.lessonsCount = lessonsCount; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
