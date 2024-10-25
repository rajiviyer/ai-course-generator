"use client";
import React, { useEffect, useState, useContext } from 'react';
import { CourseLayoutProps } from '@/configs/schema';
import { CourseIdDetails, CourseDetails, ChapterDetails, ChapterContentSearchProps, Chapters } from '@/configs/schema';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import { UserContext } from '@/app/_context/UserContext';
import Header from '@/app/dashboard/_components/Header';

export default function CourseStart({params}: CourseLayoutProps) {
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error('UserContext is not available');
    }
    const [ user, setUser] = userContext;
    const [ course, setCourse ] = useState<CourseDetails>();
    const [selectedChapter, setSelectedChapter] = useState<ChapterDetails>();
    const [chapterContent, setChapterContent] = useState<Chapters>();
    const url = process.env.NEXT_PUBLIC_API_URL;
    
    useEffect(() => {
        params && GetCourse();
      },[params, user]);
      
    const GetCourse = async ()=>{

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

    const course = await response.json();
    setCourse(course);
    GetSelectedChapterContent(0)
    }
      
    
    const GetSelectedChapterContent = async (chapterId:number) => {
        const chapterDetails: ChapterContentSearchProps = {
            course_id: params.courseId,
            chapter_id: chapterId
        };
        
        const response = await fetch(`${url}/api/get_chapter_content`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(chapterDetails),
        });
        const chapterContent: Chapters = await response.json();
        setChapterContent(chapterContent);
    }


  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
        {/* Chapter List Side Bar */}
        <div className="md:w-1/5 hidden md:block overflow-y-auto h-screen border-r shadow-sm">
            <h2 className="text-lg font-medium bg-primary text-white p-4">{course?.course_output?.["Course Name"]}</h2>
            <div>
                {course?.course_output?.["Chapters"]?.map((chapter: ChapterDetails, index: number) => (
                    <div 
                        key={index} 
                        className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.["Chapter Name"] ===chapter?.["Chapter Name"] && "bg-purple-100"}`}
                        onClick={() => {setSelectedChapter(chapter); GetSelectedChapterContent(index+1)}}
                    > 
                        <ChapterListCard chapter={chapter} index={index}/>
                    </div>
                ))}
            </div>
        </div>
        {/* Content Div */}
        <div className="md:w-4/5 h-screen bg-white">
            <Header />
            {selectedChapter &&  chapterContent &&  <ChapterContent chapter={selectedChapter} content={chapterContent}/>}
        </div>
    </div>
  )
}