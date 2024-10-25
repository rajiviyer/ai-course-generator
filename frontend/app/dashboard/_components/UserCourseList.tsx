"use client";
import React, { useEffect, useState, useContext } from 'react';
import { CourseDetails, CourseUser, User } from '@/configs/schema';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { UserContext } from '@/app/_context/UserContext';

export default function UserCourseList() {
  const [ courses, setCourses ] = useState<CourseDetails[]>();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext is not available');
  }
  const [ user, setUser] = userContext;
  const contextValue = useContext(UserCourseListContext);
    
  // Handle the case where the context might be undefined
  if (!contextValue) {
    throw new Error("UserCourseListContext is not provided");
  }
  const [userCourseList, setUserCourseList] = contextValue;
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    getUserCourses();
  },[user]);

  const getUserCourses = async () => {

    const courseUser: CourseUser = {
      created_by: user?.user_email ?? "unknown",
      username: user?.user_name ?? "unknown"
    };
    
    const response = await fetch(`${url}/api/get_all_user_courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseUser),
    });

    const courses: CourseDetails[] = await response.json();

    // console.log(courses);
    setCourses(courses);
    setUserCourseList(courses);
  };
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {userCourseList?.length > 0 ? userCourseList.map((course: CourseDetails, index) => (
          <CourseCard key={index} course={course} refreshData={()=>getUserCourses()}/>
        ))
        : 
          [1,2,3,4,5].map((item, index)=>(
            <div key={index} className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]">
            </div>
          ))
      }
      </div>
    </div>
  )
}
