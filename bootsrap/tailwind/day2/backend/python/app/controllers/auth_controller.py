"""
TechNova Python Backend - Authentication Controller (MVC Controller Layer)
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.user_schema import UserRegisterDTO, UserLoginDTO
import random
import re

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

MOCK_USERS = [
    {
        "id": "usr-101",
        "name": "Alex Chen",
        "email": "alex.chen@technova.dev",
        "phone": "+1 555-0199",
        "role": "Pro Learner",
        "xp_points": 2450,
        "streak_days": 14
    },
    {
        "id": "usr-102",
        "name": "Priya Patel",
        "email": "priya.patel@technova.dev",
        "phone": "+91 9876543210",
        "role": "AI Track Scholar",
        "xp_points": 3120,
        "streak_days": 21
    }
]

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(dto: UserRegisterDTO):
    """Handles student registration with verified Email AND Phone Number."""
    for u in MOCK_USERS:
        if u["email"].lower() == dto.email.lower():
            raise HTTPException(status_code=400, detail="Student with this email already registered.")

    new_user = {
        "id": f"usr-{random.randint(1000, 9999)}",
        "name": dto.name,
        "email": dto.email,
        "phone": dto.phone,
        "role": f"{dto.track} Specialist",
        "xp_points": 250,
        "streak_days": 1
    }
    MOCK_USERS.append(new_user)
    return {
        "status": "success",
        "message": f"Welcome to TechNova Learning Hub, {dto.name}!",
        "user": new_user,
        "token": f"jwt_token_{new_user['id']}"
    }

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(dto: UserLoginDTO):
    """Authenticates student via Email or Phone Number."""
    ident = dto.identifier.strip().lower()
    user = next((u for u in MOCK_USERS if u["email"].lower() == ident or re.sub(r"[\s\-\(\)]", "", u["phone"]) == re.sub(r"[\s\-\(\)]", "", ident)), None)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials. Verify your email or phone number.")

    return {
        "status": "success",
        "message": f"Welcome back, {user['name']}.",
        "user": user,
        "token": f"jwt_token_{user['id']}"
    }
