from fastapi.middleware.cors import CORSMiddleware
from app.controllers.course_controller import add_list, retrieve_course_details, update_course_details, get_user_courses, delete_course, get_other_courses
from app.controllers.chapter_controller import add_chapter_details, get_chapter_content
from typing import Annotated, List
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.security import OAuth2PasswordRequestForm
from .db.db_connector import get_session, create_table
from contextlib import asynccontextmanager
from .db_models.course_models import CourseList, ChapterList
from .db_models.admin_models import Admin
from .db_models.user_models import User, Token
from .utils.types import chapterList
from .utils.exceptions import (
    NotFoundException, UserEmailExistsException, InvalidInputException, TokenException
    )
from .controllers.user_controller import sign_up, sign_in


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating Tables..")
    create_table()
    yield

app = FastAPI(lifespan=lifespan)

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(NotFoundException)
def not_found(request: Request, exception: NotFoundException):
    return JSONResponse(
        status_code = 404,
        content = f"{exception.entity} {exception.entity_name} Not Found")

@app.exception_handler(UserEmailExistsException)
def user_email_exists(request: Request, exception: UserEmailExistsException):
    return JSONResponse(status_code = 404,
                 content = f"{exception.user_email} User Already Exists")

@app.exception_handler(InvalidInputException)
def invalid_input(request: Request, exception: InvalidInputException):
    print(f"Invalid Input: {exception.message}")
    return JSONResponse(
        status_code = 401,
        content = f"{exception.message}")

@app.exception_handler(TokenException)
def token_error(request: Request, exception: TokenException):
    return JSONResponse(
        status_code = 499,
        content = f"{exception.message}")

@app.get("/")
def home():
    return "Welcome!"

@app.post("/api/signup")
def user_signup(user_token_data: Annotated[dict, Depends(sign_up)]):
    if not user_token_data:
        raise NotFoundException("User")
    return user_token_data

@app.post("/api/signin")
def user_signin(user_token_data: Annotated[dict, Depends(sign_in)]):
    print(f"user_form_data: {user_token_data}")
    return user_token_data
    # if not user_form_data:
    #     raise NotFoundException("User")


@app.post("/api/add_course_list")
def add_course_list(course_id: Annotated[str,Depends(add_list)]):
    print(f"course_id={course_id}")
    return course_id

@app.post("/api/get_course_details")
def get_course(course_list: Annotated[dict,Depends(retrieve_course_details)]):
    print(f"course_list={course_list}")
    return course_list
@app.post("/api/update_course_details")
def update_course(course_details: Annotated[dict,Depends(update_course_details)]):
    print(f"course_details={course_details}")
    return course_details

@app.post("/api/add_chapter")
def add_chapter(chapter_ids: Annotated[dict,Depends(add_chapter_details)]):
    print(f"chapter_ids={chapter_ids}")
    return chapter_ids

@app.post("/api/get_all_user_courses")
def get_all_user_courses(courses: Annotated[List[dict],Depends(get_user_courses)]):
    print(f"courses={courses}")
    return courses

@app.post("/api/delete_course")
def delete_course(course_id: Annotated[str,Depends(delete_course)]):
    print(f"course_id={course_id}")
    return course_id

@app.post("/api/get_chapter_content")
def get_chapter_content(chapter_content: Annotated[dict,Depends(get_chapter_content)]):
    print(f"chapter_content in route={chapter_content}")
    return chapter_content
@app.post("/api/get_all_other_courses")
def get_all_other_courses(courses: Annotated[List[dict],Depends(get_other_courses)]):
    # print(f"courses={courses}")
    return courses