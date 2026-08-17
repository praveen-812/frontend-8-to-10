-- ============================================================================
-- TechNova Learning Hub - Relational Database Schema
-- Normalized PostgreSQL / MySQL Relational Schema for Full-Stack & AI Platform
-- ============================================================================

-- 1. USERS & AUTHENTICATION TABLE (Requires Email AND Phone Number)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(25) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Pro Learner',
    avatar_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    xp_points INT DEFAULT 250,
    streak_days INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for instant lookup on Email or Phone Number
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- 2. TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS technologies (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('fullstack', 'ai', 'cloud', 'database')),
    level VARCHAR(30) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    badge_color VARCHAR(100),
    description TEXT NOT NULL,
    why_learn TEXT NOT NULL,
    code_snippet TEXT
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(30) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    lessons_count INT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 4.90,
    students_count INT DEFAULT 0,
    image_icon VARCHAR(100) NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    summary TEXT NOT NULL,
    badge VARCHAR(50)
);

-- 4. COURSE MODULES & LESSONS
CREATE TABLE IF NOT EXISTS course_modules (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    module_index INT NOT NULL,
    title VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS course_lessons (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    lesson_order INT NOT NULL
);

-- 5. STUDENT COURSE ENROLLMENTS & LIVE PROGRESS
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    progress_pct INT DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    is_completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- 6. REAL-WORLD PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    architecture_overview TEXT NOT NULL,
    db_schema_snippet TEXT
);

-- 7. STUDENT COMPLETED PROJECTS JUNCTION
CREATE TABLE IF NOT EXISTS user_completed_projects (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    project_id VARCHAR(50) REFERENCES projects(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id)
);

-- 8. VERIFIED CERTIFICATES OF MASTERY
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'CERT-TN-8821'
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    course_title VARCHAR(200) NOT NULL,
    issue_date VARCHAR(50) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    digital_signature_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI PROMPT SANDBOX LOGS
CREATE TABLE IF NOT EXISTS ai_prompt_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    model_name VARCHAR(50) NOT NULL,
    system_instruction TEXT,
    user_prompt TEXT NOT NULL,
    completion_text TEXT NOT NULL,
    tokens_generated INT,
    duration_ms INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
