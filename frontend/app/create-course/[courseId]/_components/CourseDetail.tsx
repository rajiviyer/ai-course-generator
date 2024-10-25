import React from 'react';
import { CourseDetails } from '@/configs/schema'
import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlineVideoCamera  } from "react-icons/hi2";

export default function CourseDetail({ course }: {course: CourseDetails}) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="flex gap-2">
                <HiOutlineChartBar className="text-4xl text-primary"/>
                <div>
                    <h2 className="text-xs text-gray-500">Skill Level</h2>
                    <h2 className="font-medium text-lg">{course?.level}</h2>
                </div>
            </div>
            <div className="flex gap-2">
                <HiOutlineClock className="text-4xl text-primary"/>
                <div>
                    <h2 className="text-xs text-gray-500">Duration</h2>
                    <h2 className="font-medium text-lg">{course?.course_output?.["Duration"]}</h2>
                </div>
            </div>
            <div className="flex gap-2">
                <HiOutlineBookOpen className="text-4xl text-primary"/>
                <div>
                    <h2 className="text-xs text-gray-500">No. of Chapters</h2>
                    <h2 className="font-medium text-lg">{course?.course_output?.["No of Chapters"]}</h2>
                </div>
            </div>
            <div className="flex gap-2">
                <HiOutlineVideoCamera className="text-4xl text-primary"/>
                <div>
                    <h2 className="text-xs text-gray-500">Video Included?</h2>
                    <h2 className="font-medium text-lg">{course?.include_video}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
