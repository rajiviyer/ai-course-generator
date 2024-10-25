"use client";
import React, { useEffect, useState, useContext } from 'react'
import { CourseIdDetails, CourseDetails } from '@/configs/schema';
// import { useUser } from "@clerk/nextjs"; 
import { CourseLayoutProps } from '@/configs/schema';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import Header from '@/app/dashboard/_components/Header';
import { UserContext } from '@/app/_context/UserContext';

export default function Course({params}: CourseLayoutProps) {
    // const { user } = useUser();
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error('UserContext is not available');
    }
    const [ user, setUser] = userContext;
    const [ course, setCourse ] = useState<CourseDetails>();
    const url = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        params && GetCourse();
      },[params, user]);
      // console.log(`User: ${user}`);
      
      const GetCourse = async ()=>{
    
        const courseDetails: CourseIdDetails = {
          course_id: params.courseId,
          created_by: user?.user_email?? "unknown",
        };
        
        const response = await fetch(`${url}/api/get_course_details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseDetails),
        });
    
        const course = await response.json();
        setCourse(course);
        // console.log(`Course: ${course}`);
      }    
  return (
    <div>
        <Header />
        <div className="px-10 p-10 md:px-20 lg:px-44">

            {/* Basic Info */}
            {course && <CourseBasicInfo course={course} edit={false} />}

            {/* Course Detail */}
            {course && <CourseDetail course={course} />}            

            {/* List of Chapters */}
            {course && <ChapterList course={course} edit={false}/>}            
        </div>
    </div>
  )
}
