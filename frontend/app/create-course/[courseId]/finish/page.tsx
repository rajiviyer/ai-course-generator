"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { CourseIdDetails, CourseDetails, ChapterDetails, Chapters, CourseLayoutProps, User } from '@/configs/schema';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { UserContext } from '@/app/_context/UserContext';

export default function FinishScreen({params}: CourseLayoutProps) {
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error('UserContext is not available');
    }
    const [ user, setUser] = userContext;
    const [ course, setCourse ] = useState<CourseDetails>();
    const url = process.env.NEXT_PUBLIC_API_URL;
    const courseURL = course?`${process.env.NEXT_PUBLIC_SERVER_URL}/course/view/${course?.course_id}`:"";
    const router = useRouter();

    useEffect(() => {
        params && GetCourse();
    },[params, user]);

    const GetCourse= async ()=>{

        const courseDetails: CourseIdDetails = {
        course_id: params.courseId,
        created_by: user?.user_email ?? "unknown",
        };
        
        const response = await fetch(`${url}/api/get_course_details`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseDetails),
        });

        const result = await response.json();
        setCourse(result);
        // console.log(course);
    }
    
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7 ">
        <h2 className="text-center font-bold text-2xl my-3 text-primary">Congrats!! Your course is ready</h2>
        {course && <CourseBasicInfo course={course} refreshData={()=>console.log()} />}
        {
        courseURL &&  
            (
            <div>
                <h2 className="mt-3">Course URL:</h2>
                <h2 className="text-center border p-2 round text-gray-400 flex gap-5 items-center">
                    {courseURL}
                    <HiOutlineClipboardDocumentCheck 
                        className="h-5 w-5 cursor-pointer" 
                        onClick={async () => {
                            if (navigator.clipboard && courseURL) {
                              try {
                                await navigator.clipboard.writeText(courseURL);
                                // console.log("Copied to clipboard");
                              } catch (err) {
                                console.error("Failed to copy: ", err);
                              }
                            } else {
                              console.error("Clipboard API not available or courseURL is undefined.");
                            }
                          }}                          
                        />
                </h2>
            </div>
            )
        }
    </div>
  )
}
