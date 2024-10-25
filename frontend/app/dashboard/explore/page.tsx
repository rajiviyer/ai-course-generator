"use client";
import React, { useEffect, useState } from 'react';
import { CourseDetails, CourseUser } from '@/configs/schema';
// import { useUser } from "@clerk/nextjs";
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';
export default function Explore() {
  const [ courses, setCourses ] = useState<CourseDetails[]>();
  const [ pageIndex, setPageIndex ] = useState(0);
  // const { user } = useUser();
  const user_email = "raju.rgi@gmail.com"
  const url = process.env.NEXT_PUBLIC_API_URL;
  const pageSize = 9;

  useEffect(() => {
      GetAllCourses();
    },[user_email, pageIndex]);
    
  const GetAllCourses = async ()=>{
    const otherCourseFilter = {
      //  created_by: user?.primaryEmailAddress?.emailAddress ?? "unknown",
      created_by: user_email,
      page_index: pageIndex,
      page_size: pageSize
    };
    
    const response = await fetch(`${url}/api/get_all_other_courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otherCourseFilter),
    });

    const courses = await response.json();
    setCourses(courses);
  }    

    return (
      <div className="mt-10">
        <h2 className="font-bold text-3xl">Explore More Projects</h2>
        <p>Explore more projects built with AI by other users</p>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(courses && courses.length > 0) ? courses.map((course: CourseDetails, index) => (
            <CourseCard key={index} course={course} refreshData={()=>GetAllCourses()} displayUser={true} edit={false}/>
          ))
          : 
            [1,2,3,4,5].map((item, index)=>(
              <div key={index} className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]">
              </div>
            ))
        }
        </div>
        <div className="flex justify-between mt-5">
          {pageIndex > 0 && <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>}
          { (courses && pageIndex < courses.length/9) && <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>}
        </div>
      </div>
    )
}
