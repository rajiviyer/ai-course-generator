from ..db_models.course_models import ChapterList
from ..db.db_connector import get_session
from fastapi import Depends
from sqlmodel import Session, select
from typing import Annotated
from ..utils.types import chapterList, ChapterContentSearchProps
from uuid import UUID

DBSession = Annotated[Session, Depends(get_session)]

def add_chapter_details(chapter_list_param: chapterList, session: DBSession):
    print(f"chapter_list_param={chapter_list_param}")
    chapter_list = ChapterList(
                             course_id = UUID(chapter_list_param["course_id"]),
                             chapter_id = chapter_list_param["chapter_id"],
                             content = chapter_list_param["content"],
                             video_id = chapter_list_param["video_id"]
                             )
    print(f"chapter_list={chapter_list}")
    session.add(chapter_list)
    session.commit()
    session.refresh(chapter_list)
    
    return {
            "course_id": chapter_list.course_id,     
            "chapter_id": chapter_list.chapter_id
            }  

def get_chapter_content(chapter_content_param: ChapterContentSearchProps, session: DBSession):
    print(f"chapter_content_param={chapter_content_param}")
    chapter_content = session.exec(select(ChapterList).where(ChapterList.course_id == chapter_content_param["course_id"]).where(ChapterList.chapter_id == chapter_content_param["chapter_id"])).first()
    return chapter_content

# def retrieve_course_details(course_details_param: courseDetails, session: DBSession):
#     print(f"course_details_param={course_details_param}")
#     course_list = session.exec(select(CourseList).where(CourseList.course_id == course_details_param["course_id"]).where(CourseList.created_by == course_details_param["created_by"])).first()
#     print(f"course_list={course_list}")
#     return course_list

# def update_course_details(course_details_param: courseUpdateDetails, session: DBSession):
#     print(f"course_details_param={course_details_param}")
#     course_db_data = session.exec(select(CourseList).where(CourseList.course_id == course_details_param["course_id"]).where(CourseList.created_by == course_details_param["created_by"])).first()
#     course_db_data.sqlmodel_update(course_details_param)
#     session.add(course_db_data)
#     session.commit()
#     session.refresh(course_db_data)
#     print(f"course_db_data={course_db_data}")
#     return course_db_data