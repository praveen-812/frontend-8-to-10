"""
TechNova Python Backend - User & Auth Pydantic Schemas (DTO Layer)
"""

from pydantic import BaseModel, EmailStr, Field, field_validator
import re
from typing import Optional, List

class UserRegisterDTO(BaseModel):
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

class UserLoginDTO(BaseModel):
    identifier: str = Field(..., description="Email address or Phone number")
    password: str

class UserResponseDTO(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    role: str
    xp_points: int
    streak_days: int
