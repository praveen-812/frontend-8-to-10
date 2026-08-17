-- ============================================================================
-- TechNova Learning Hub - Seed Data Script
-- Populates initial test users, courses, technologies, and projects
-- ============================================================================

-- 1. Insert Initial Student Users (Email & Phone)
INSERT INTO users (id, name, email, phone, password_hash, role, xp_points, streak_days)
VALUES 
(101, 'Alex Chen', 'alex.chen@technova.dev', '+1 555-0199', '$2b$12$eX4mP1eH4sHkEyB1n4rY', 'Pro Learner', 2450, 14),
(102, 'Priya Patel', 'priya.patel@technova.dev', '+91 9876543210', '$2b$12$eX4mP1eH4sHkEyB1n4rY', 'AI Track Scholar', 3120, 21)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Core Technologies
INSERT INTO technologies (id, name, category, level, icon, badge_color, description, why_learn)
VALUES
('html5', 'HTML5', 'fullstack', 'Beginner', 'fa-brands fa-html5 text-orange-500', 'bg-orange-500/10 text-orange-600 border-orange-500/20', 'The standard markup language for structuring web pages.', 'HTML5 is the absolute foundation of all web development.'),
('css3', 'CSS3', 'fullstack', 'Beginner', 'fa-brands fa-css3-alt text-blue-500', 'bg-blue-500/10 text-blue-600 border-blue-500/20', 'Cascading Style Sheets for responsive layout algorithms and fluid animations.', 'CSS3 turns raw HTML structure into modern, responsive web interfaces.'),
('javascript', 'JavaScript', 'fullstack', 'Beginner - Intermediate', 'fa-brands fa-js text-yellow-400', 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', 'The core programming language of the web.', 'JavaScript powers all modern web frameworks and backend servers with Node.js.'),
('python', 'Python', 'fullstack', 'Beginner - Intermediate', 'fa-brands fa-python text-emerald-500', 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', 'Versatile backend language for FastAPI, AI & Data Science.', 'Python is the undisputed lingua franca of Artificial Intelligence and backend APIs.'),
('java', 'Java', 'fullstack', 'Beginner - Intermediate', 'fa-brands fa-java text-red-500', 'bg-red-500/10 text-red-600 border-red-500/20', 'Enterprise backend language powering Spring Boot microservices.', 'Java is the backbone of global enterprise banking and cloud infrastructure.'),
('sql', 'SQL & Databases', 'fullstack', 'Beginner - Intermediate', 'fa-solid fa-database text-blue-400', 'bg-blue-500/10 text-blue-600 border-blue-500/20', 'Structured Query Language for relational database management.', 'Every full-stack application relies on persistent relational data storage.'),
('generative-ai', 'Generative AI & LLMs', 'ai', 'Intermediate', 'fa-solid fa-wand-magic-sparkles text-pink-400', 'bg-pink-500/10 text-pink-500 border-pink-500/20', 'Models generating text, code, and images from natural language.', 'Generative AI is the fastest growing technological revolution in history.'),
('ai-agents', 'AI Agents & Workflows', 'ai', 'Intermediate', 'fa-solid fa-robot text-rose-400', 'bg-rose-500/10 text-rose-500 border-rose-500/20', 'Autonomous software using LLM reasoning and external tools.', 'AI Agents automate complex multi-step workflows and web browsing.')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Courses
INSERT INTO courses (id, title, category, level, duration, lessons_count, rating, students_count, image_icon, instructor, summary, badge)
VALUES
('course-html-css', 'Modern HTML5 & CSS3 Masterclass', 'fullstack', 'Beginner', '18 Hours', 42, 4.90, 14200, 'fa-brands fa-html5 text-orange-500', 'Marcus Vance', 'Master HTML5 semantics, CSS3 Grid, Flexbox, and CSS variables.', 'Best for Beginners'),
('course-python-fastapi', 'Full-Stack Python & FastAPI Backend API', 'fullstack', 'Intermediate', '32 Hours', 64, 4.90, 12800, 'fa-brands fa-python text-emerald-400', 'Dr. Sarah Chen', 'Build production REST APIs with Python, FastAPI, JWT & SQLAlchemy.', 'High Demand'),
('course-genai-llm', 'Generative AI, LLMs & Prompt Engineering', 'ai', 'Intermediate', '30 Hours', 55, 5.00, 24600, 'fa-solid fa-wand-magic-sparkles text-pink-400', 'Sofia Alvarez', 'Build applications using Large Language Models, RAG, and vector databases.', 'Flagship AI')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Verified Certificates
INSERT INTO certificates (id, user_id, course_id, course_title, issue_date, grade, digital_signature_hash)
VALUES
('CERT-TN-8821', 101, 'course-html-css', 'Modern HTML5 & CSS3 Masterclass', 'August 10, 2026', '98% (Exemplary)', 'sha256_e8f230b0d9124ac89912'),
('CERT-TN-9934', 102, 'course-genai-llm', 'Generative AI, LLMs & Prompt Engineering', 'August 12, 2026', '99% (Distinction)', 'sha256_a941f87c1240182d0012')
ON CONFLICT (id) DO NOTHING;
