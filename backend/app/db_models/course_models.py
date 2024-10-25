from typing import Optional, Dict
from sqlmodel import SQLModel, Field, JSON, Column
from sqlalchemy import UniqueConstraint
from uuid import UUID, uuid4

class CourseList(SQLModel, table=True):
    id: int = Field(None, primary_key=True)
    course_id: UUID = Field(default_factory=uuid4, unique=True, index=True)
    name: str
    category: str
    level: str
    include_video: str
    course_output: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    created_by: str
    username: str
    course_banner_image: str = Field(default = "/placeholder.png")
    publish: bool = False

class ChapterList(SQLModel, table=True):
    id: int = Field(None, primary_key=True)
    course_id: UUID = Field(index=True)
    chapter_id: int
    content: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    video_id: str