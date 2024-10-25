import { createContext, Dispatch, SetStateAction } from "react";
import { CourseDetails, User, UserCourseInput } from "@/configs/schema";

export type UserInputContextType = [
  UserCourseInput,
  Dispatch<SetStateAction<UserCourseInput>>
];

export type UserCourseList = CourseDetails[]

export type UserCourseListContextType = [
  UserCourseList,
  Dispatch<SetStateAction<CourseDetails[]>>
]

export type UserContextType = [
  User,
  Dispatch<SetStateAction<User>>
]