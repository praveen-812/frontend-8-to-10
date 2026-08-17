# TechNova Learning Hub - System Architecture Blueprint

This document details the communication architecture between the **Frontend (HTML5/Tailwind/JS)**, **REST APIs (Python FastAPI & Java Spring Boot)**, and the **SQL Database (PostgreSQL / MySQL)**.

---

## 1. System Communication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT FRONTEND                          │
│   (HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript ES6+)   │
│   • Dark/Light Theme & Antigravity Glassmorphism UI         │
│   • In-Browser Live Code Runner & Prompt Sandbox            │
│   • Email + Phone Authentication & Session Persistence      │
└──────────────────────────────┬──────────────────────────────┘
                               │  HTTPS / JSON REST API / WebSockets
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVICES                         │
│  ┌─────────────────────────────┐  ┌───────────────────────┐ │
│  │     Python FastAPI          │  │   Java Spring Boot 3  │ │
│  │  • Async REST Endpoints     │  │  • Spring Data JPA    │ │
│  │  • Pydantic Email & Phone   │  │  • Spring Security    │ │
│  │  • AI LLM Streaming Engine  │  │  • Enterprise Routing │ │
│  └──────────────┬──────────────┘  └───────────┬───────────┘ │
└─────────────────┼─────────────────────────────┼─────────────┘
                  │   SQLAlchemy / Hibernate    │
                  ▼                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    SQL DATABASE                             │
│   (PostgreSQL / MySQL Relational Schema)                    │
│   • users (email, phone, role, password_hash, xp, streak)   │
│   • courses & course_modules (syllabuses, lessons)          │
│   • enrollments & progress (live %, is_completed)           │
│   • projects & user_completed_projects                      │
│   • certificates (unique verification IDs, issue dates)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Entity-Relationship (ER) Schema Overview

- **`users` (1) ───< `enrollments` (M) >─── (1) `courses`**
  - Tracks student progress percentage (0 - 100%) and completion date.
- **`users` (1) ───< `certificates` (M)**
  - Stores verified credentials issued when a course reaches 100% completion.
- **`courses` (1) ───< `course_modules` (M) ───< `course_lessons` (M)**
  - Hierarchical curriculum structure for syllabus inspection.
- **`users` (1) ───< `user_completed_projects` (M) >─── (1) `projects`**
  - Records hands-on projects completed for student XP points calculation.

---

## 3. Security & Validation Rules

1. **Email & Phone Requirement**: All registered users must provide both a valid email address and an international phone number (validated with regex `^\+?[0-9]{8,15}$`).
2. **Password Hashing**: Passwords stored as BCrypt salted hashes.
3. **Stateless JWT Tokens**: Requests to protected endpoints carry a `Bearer <token>` in the `Authorization` header.
