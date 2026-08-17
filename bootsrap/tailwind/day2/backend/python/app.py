"""
TechNova Learning Hub - Production Python Backend (FastAPI)
RESTful API for Authentication (Email & Phone), Courses, Enrollments, Progress, Projects & AI Sandbox
"""

from fastapi import FastAPI, HTTPException, Depends, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional, Dict, Any
import re
import random
from datetime import datetime, timedelta

app = FastAPI(
    title="TechNova Learning Hub REST API",
    description="Full-Stack Development & AI Technology Learning Platform API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 1. PYDANTIC SCHEMAS & DATA MODELS
# ==========================================

class UserRegisterSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., description="Phone number with country code")
    password: str = Field(..., min_length=6)
    track: Optional[str] = "Full-Stack Developer"

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)]", "", v)
        if not (8 <= len(cleaned) <= 16 and re.match(r"^\+?[0-9]+$", cleaned)):
            raise ValueError("Invalid phone number format. Provide 8-15 digits with optional '+' prefix.")
        return v

class UserLoginSchema(BaseModel):
    identifier: str = Field(..., description="Email address or Phone number")
    password: str

class CourseResponseSchema(BaseModel):
    id: str
    title: str
    category: str
    level: str
    duration: str
    lessons_count: int
    rating: float
    instructor: str
    summary: str

class ProgressUpdateSchema(BaseModel):
    course_id: str
    progress_percentage: int = Field(..., ge=0, le=100)

class AIPromptRequest(BaseModel):
    system_prompt: str
    user_prompt: str
    model: Optional[str] = "gpt-4o"
    temperature: Optional[float] = 0.7

# ==========================================
# 2. IN-MEMORY DATABASE SIMULATION (MAPPED TO SQL)
# ==========================================

MOCK_USERS_DB = [
    {
        "id": "usr-101",
        "name": "Alex Chen",
        "email": "alex.chen@technova.dev",
        "phone": "+1 555-0199",
        "role": "Pro Learner",
        "enrolled_courses": ["course-html-css", "course-js-es6"],
        "progress": {"course-html-css": 100, "course-js-es6": 75},
        "points": 2450
    },
    {
        "id": "usr-102",
        "name": "Priya Patel",
        "email": "priya.patel@technova.dev",
        "phone": "+91 9876543210",
        "role": "AI Track Scholar",
        "enrolled_courses": ["course-ai-foundations", "course-genai-llm"],
        "progress": {"course-ai-foundations": 100, "course-genai-llm": 85},
        "points": 3120
    }
]

# ==========================================
# 3. AUTHENTICATION ENDPOINTS (EMAIL + PHONE)
# ==========================================

@app.post("/api/v1/auth/register", status_code=status.HTTP_201_CREATED)
async def register_student(payload: UserRegisterSchema):
    """Register a new student requiring valid Email AND Phone Number."""
    for u in MOCK_USERS_DB:
        if u["email"].lower() == payload.email.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A student with this email is already registered."
            )

    new_user = {
        "id": f"usr-{random.randint(1000, 9999)}",
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "role": f"{payload.track} Specialist",
        "enrolled_courses": ["course-html-css"],
        "progress": {"course-html-css": 10},
        "points": 250
    }
    MOCK_USERS_DB.append(new_user)

    return {
        "status": "success",
        "message": f"Welcome to TechNova Learning Hub, {payload.name}!",
        "user": new_user,
        "token": f"jwt_mock_token_{new_user['id']}"
    }

@app.post("/api/v1/auth/login", status_code=status.HTTP_200_OK)
async def login_student(payload: UserLoginSchema):
    """Sign in with Email address OR Phone number."""
    ident = payload.identifier.strip().lower()
    
    # Check match against email or phone
    user = None
    for u in MOCK_USERS_DB:
        if u["email"].lower() == ident or re.sub(r"[\s\-\(\)]", "", u["phone"]) == re.sub(r"[\s\-\(\)]", "", ident):
            user = u
            break

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Please verify your email or phone number."
        )

    return {
        "status": "success",
        "message": f"Authenticated successfully as {user['name']}.",
        "user": user,
        "token": f"jwt_mock_token_{user['id']}"
    }

# ==========================================
# 4. COURSES & ENROLLMENT ENDPOINTS
# ==========================================

@app.get("/api/v1/courses", status_code=status.HTTP_200_OK)
async def list_courses(
    department: Optional[str] = Query(None, description="Filter by 'fullstack' or 'ai'"),
    level: Optional[str] = Query(None, description="Filter by 'Beginner' or 'Intermediate'")
):
    """Fetch structured course catalogs with optional department and level filtering."""
    # Simulating database query return
    return {
        "status": "success",
        "department_filter": department,
        "level_filter": level,
        "total_count": 12,
        "message": "Connected to TechNova SQL Courses repository."
    }

@app.post("/api/v1/courses/{course_id}/enroll", status_code=status.HTTP_200_OK)
async def enroll_course(course_id: str, user_id: str = Query(...)):
    """Enroll a student in a course track and initialize progress tracking."""
    user = next((u for u in MOCK_USERS_DB if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="Student not found.")

    if course_id not in user["enrolled_courses"]:
        user["enrolled_courses"].append(course_id)
        user["progress"][course_id] = 5

    return {
        "status": "success",
        "message": f"Successfully enrolled in course {course_id}.",
        "enrolled_courses": user["enrolled_courses"]
    }

@app.put("/api/v1/progress", status_code=status.HTTP_200_OK)
async def update_progress(payload: ProgressUpdateSchema, user_id: str = Query(...)):
    """Update student progress and issue certificate upon reaching 100%."""
    user = next((u for u in MOCK_USERS_DB if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="Student not found.")

    user["progress"][payload.course_id] = payload.progress_percentage
    certificate_issued = False

    if payload.progress_percentage >= 100:
        certificate_issued = True
        user["points"] += 300

    return {
        "status": "success",
        "course_id": payload.course_id,
        "progress": payload.progress_percentage,
        "certificate_issued": certificate_issued,
        "total_xp": user["points"]
    }

# ==========================================
# 5. AI SANDBOX PROMPT EXECUTION ENDPOINT
# ==========================================

@app.post("/api/v1/ai/prompt-execution", status_code=status.HTTP_200_OK)
async def execute_ai_prompt(payload: AIPromptRequest):
    """Execute AI prompt engineering simulation against LLM models."""
    return {
        "status": "success",
        "model": payload.model,
        "temperature": payload.temperature,
        "tokens_generated": random.randint(120, 350),
        "speed_tokens_per_sec": 72,
        "simulated_completion": f"AI Response generated for prompt: '{payload.user_prompt[:50]}...'"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
