"""
TechNova Python Backend - Course Controller (MVC Controller Layer)
"""

from fastapi import APIRouter, Query
from typing import Optional, List

router = APIRouter(prefix="/api/v1/courses", tags=["Courses"])

@router.get("")
async def get_courses(
    department: Optional[str] = Query(None, description="'fullstack' or 'ai'"),
    level: Optional[str] = Query(None, description="'Beginner' or 'Intermediate'")
):
    """Retrieve structured courses catalog with optional department and level filtering."""
    return {
        "status": "success",
        "department": department,
        "level": level,
        "count": 12,
        "message": "Connected to TechNova Courses Repository."
    }
