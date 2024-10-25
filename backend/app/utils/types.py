from typing_extensions import TypedDict
from typing import List
from uuid import UUID, uuid4

class TokenType(TypedDict):
    user_name: str;
    user_email: str;
    access_expiry_time: int;
    refresh_expiry_time: int;
    
class courseList(TypedDict):
    name: str;
    category: str;
    level: str;
    include_video: str;
    course_output: dict;
    created_by: str;
    username: str;
    course_banner_image: str;
    publish: bool = False;

class courseUpdateDetails(TypedDict):
    course_id: UUID;
    name: str;
    category: str;
    level: str;
    include_video: str;
    course_output: dict;
    created_by: str;
    username: str;
    course_banner_image: str;
    publish: bool = False;

class courseDetails(TypedDict):
    course_id: str;
    created_by: str;
    
class courseUser(TypedDict):
    created_by: str;
    username: str;
    
class chapterList(TypedDict):
    course_id: str;
    chapter_id: int;
    content: List[dict];
    video_id: str;
    
class ChapterContentSearchProps(TypedDict):
    course_id: str;
    chapter_id: int;
    
class otherCourseFilter(TypedDict):
    created_by: str
    page_index: int
    page_size: int
