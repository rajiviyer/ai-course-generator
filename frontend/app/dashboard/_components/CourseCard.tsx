"use client";
import React from 'react';
import { CourseInfoProps, CourseIdDetails, CourseDetails } from '@/configs/schema';
import Image from "next/image";
import { HiOutlineBookOpen, HiMiniEllipsisVertical } from "react-icons/hi2";
import DropDownOption from './DropDownOption';
import Link from 'next/link';

export default function CourseCard(
  { course, refreshData, displayUser = false, edit = true }: 
  { course: CourseDetails, refreshData: () => void, displayUser?: boolean, edit?: boolean } 
) {

    const url = process.env.NEXT_PUBLIC_API_URL;
    // const course = courseInfo?.course;

    const handleOnDelete = async () => {
        
        const courseDetails: CourseIdDetails = {
            course_id: course?.course_id,
            created_by: course?.created_by,
          };
          
          const response = await fetch(`${url}/api/delete_course`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courseDetails),
          });
      
          const course_id = await response.json();
          // console.log("Deleted", course_id);
          if (course_id) {
              refreshData();
          }
    }

  return (
    <div className="shadow-sm rounded-lg border border-gray-200 p-2 cursor-pointer mt-4 hover:border-primary">
        {/* hover: scale-105 transition-all  */}
        <Link href={`/course/${course?.course_id}`}>
        <Image 
            src={course?.course_banner_image} alt="" width={300} height={200} 
            className="w-full h-[200px] object-cover rounded-lg"  
        />
        </Link>
        <div className="p-2">
            <h2 
                className="font-medium text-lg flex justify-between items-center">
                {course?.name} 
                { edit && <DropDownOption handleOnDelete={handleOnDelete}>
                    <HiMiniEllipsisVertical />
                </DropDownOption>}
            </h2>
            <p className="text-sm text-gray-400 my-1">{course?.category}</p>
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-1 p-1 bg-purple-50 text-primary text-sm rounded-sm">
                        <HiOutlineBookOpen />{course?.course_output?.["No of Chapters"]} Chapters
                </h2>
                <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">{course?.course_output?.["Level"]}</h2>
            </div>
            { displayUser && <div className="flex items-center gap-2 mt-2">
              <h2 className="text-sm">course?.username</h2>
            </div>}
        </div>
    </div>
  )
}
