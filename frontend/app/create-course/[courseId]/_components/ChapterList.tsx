import React from 'react';
import { CourseDetails } from '@/configs/schema';
import { HiOutlineClock, HiOutlineCheckCircle   } from "react-icons/hi2";
import EditChapters from './EditChapters';

export default function ChapterList(
    { course, refreshData=()=> {}, edit=true }: {course: CourseDetails, refreshData?: () => void, edit?: boolean}
) {
    if (!course) {
        return <div>No course information available.</div>; // Add fallback if course is missing
    } 

  return (
    <div className="mt-4">
        <h2 className="font-medium text-xl">Chapters</h2>
        <div className="mt-2">
            {course?.course_output?.["Chapters"].map((chapter, index)=>{
                return (
                    <div className="border p-5 rounded-lg mb-2 flex items-center justify-between">
                        <div className="flex gap-5 items-center">
                            <h2 className="bg-primary flex-none w-10 h-10 text-white rounded-full text-center p-2">{index+1}</h2>
                            <div>
                                <h2 className="font-medium text-lg">{chapter?.["Chapter Name"]} 
                                { edit &&  <EditChapters course={course} index={index} refreshData={refreshData}/> }
                                </h2>
                                <p className="text-sm text-gray-500">{chapter?.["About"]}</p>
                                <p className="flex gap-2 text-primary items-center"><HiOutlineClock /> {chapter?.["Duration"]}</p>
                            </div>
                        </div>
                        <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none"/>
                    </div>
                )
            })
            }
        </div>
    </div>
  )
}
