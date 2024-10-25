from ..db_models.course_models import CourseList
from ..db.db_connector import get_session
from fastapi import Depends
from sqlmodel import Session, select, delete
from typing import Annotated
from ..utils.types import courseList, courseDetails, courseUpdateDetails, courseUser, otherCourseFilter

DBSession = Annotated[Session, Depends(get_session)]

def add_list(course_list_param: courseList, session: DBSession):
    print(f"course_list_param={course_list_param}")
    course_list = CourseList(
                             name = course_list_param["name"],
                             category = course_list_param["category"],
                             level = course_list_param["level"],
                             include_video = course_list_param["include_video"],
                             course_output = course_list_param["course_output"],
                             created_by = course_list_param["created_by"],
                             username = course_list_param["username"],
                             course_banner_image = course_list_param["course_banner_image"],
                             publish = course_list_param["publish"]
                             )
    print(f"course_list={course_list}")
    session.add(course_list)
    session.commit()
    session.refresh(course_list)
    
    return course_list.course_id

def retrieve_course_details(course_details_param: courseDetails, session: DBSession):
    print(f"course_details_param={course_details_param}")
    course_list = session.exec(select(CourseList).where(CourseList.course_id == course_details_param["course_id"]).where(CourseList.created_by == course_details_param["created_by"])).first()
    print(f"course_list={course_list}")
    return course_list

def update_course_details(course_details_param: courseUpdateDetails, session: DBSession):
    print(f"course_details_param={course_details_param}")
    course_db_data = session.exec(select(CourseList).where(CourseList.course_id == course_details_param["course_id"]).where(CourseList.created_by == course_details_param["created_by"])).first()
    course_db_data.sqlmodel_update(course_details_param)
    session.add(course_db_data)
    session.commit()
    session.refresh(course_db_data)
    print(f"course_db_data={course_db_data}")
    return course_db_data

def get_user_courses(course_user_param: courseUser, session: DBSession):
    print(f"course_user_param={course_user_param}")
    course_list = session.exec(select(CourseList).where(CourseList.created_by == course_user_param["created_by"])).all()
    print(f"course_list type={type(course_list)}")
    return course_list

def delete_course(course_details_param: courseDetails, session: DBSession):
    print(f"course_details_param={course_details_param}")
    course = session.exec(select(CourseList).where(CourseList.course_id == course_details_param["course_id"]).where(CourseList.created_by == course_details_param["created_by"])).first()
    session.delete(course)
    session.commit()
    print(f"Deleted {course.course_id}")
    return course.course_id

def get_other_courses(course_other_param: otherCourseFilter, session: DBSession):
    print(f"course_other_param={course_other_param}")
    created_by = course_other_param["created_by"]
    page_index = course_other_param["page_index"]
    page_size = course_other_param["page_size"]
    course_list = session.exec(select(CourseList).where(CourseList.created_by != created_by).limit(page_size).offset((page_index - 1) * page_size)).all()
    return course_list