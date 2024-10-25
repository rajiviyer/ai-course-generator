"use client";
import React, { useEffect, useState, useContext } from 'react'; 
import { CourseIdDetails, CourseLayoutProps, CourseDetails, ChapterDetails, Chapters } from '@/configs/schema';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContentAI } from '@/configs/AIModels';
import LoadingDialog from '@/app/create-course/_components/LoadingDialog';
import { getVideos } from '@/configs/service';
import { useRouter } from "next/navigation";
import { UserContext } from '@/app/_context/UserContext';

export default function CourseLayout({params}: CourseLayoutProps) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext is not available');
  }
  const [ user, setUser] = userContext;
  const [ course, setCourse ] = useState<CourseDetails>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_API_URL;
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

    const course = await response.json();
    setCourse(course);
    // console.log(course);
  }

  const GenerateChapterContent = async () => {
    if (course?.course_output?.["Chapters"]) {
      setLoading(true);
      const chapters:[ChapterDetails] = course.course_output["Chapters"];
      chapters.forEach(async (chapter, index) => {
        const PROMPT = `
          Explain the concept in Detail on 
          Topic: ${course?.course_output?.["Topic"]}, Chapter: ${chapter?.["Chapter Name"]}, in JSON Format 
          with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable
          `;
        // console.log(PROMPT);
        try {
          let videoId = "";

          // Generate Video URL
          getVideos(course?.name + ":" + chapter?.["Chapter Name"]).then(resp => {
            // console.log(resp);
            videoId = resp[0]?.id?.videoId;
          })
          
          // Generate Chapter Content
          const result = await GenerateChapterContentAI.sendMessage(PROMPT);
          // console.log(result?.response?.text().replace('"""',"'''"));
          const content = JSON.parse(result?.response?.text().replace('"""',"'''"));
          


          const chapterDetails: Chapters = {
            course_id: course?.course_id,
            chapter_id: index + 1,
            content: content,
            video_id: videoId
          };

          const response = await fetch(`${url}/api/add_chapter`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chapterDetails),
          });

          const chapter_ids = await response.json();

          setLoading(false);

          } catch (error) {
            setLoading(false);
            // console.log(error);
          }

          course.publish = true;
          const response = await fetch(`${url}/api/update_course_details`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(course),
            });
            
          // const updatedCourse = await response.json();
          // console.log(`updated course: ${JSON.stringify(updatedCourse)}`);
          // refreshData();

          router.replace('/create-course/'+ course?.course_id +'/finish');
      })  
    }
  }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialog loading={loading}/>
      {/* Basic Info */}
      {course && <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>}

      {/* Course Detail */}
      {course && <CourseDetail course={course}  />}

      {/* List of Chapters */}
      {course && <ChapterList course={course} refreshData={()=>GetCourse()}/>}

      <Button className="my-10" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>

      </div>
  )
}
