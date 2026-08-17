package com.technova.learninghub.dto;

public record UserDTO(
    String id,
    String name,
    String email,
    String phone,
    String role,
    int xpPoints,
    int streakDays
) {}
