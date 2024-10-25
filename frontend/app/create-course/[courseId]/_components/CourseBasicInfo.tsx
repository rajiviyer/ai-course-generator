import { CourseInfoProps } from '@/configs/schema'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/configs/firebaseConfig';
import { CourseDetails } from '@/configs/schema';
import Link from 'next/link';

export default function CourseBasicInfo(
  { course, refreshData=()=> {}, edit=true }: {course: CourseDetails, refreshData?: () => void, edit?: boolean}
) {
  const [selectedFile, setSelectedFile] = useState<string>();
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if(course) {
      setSelectedFile(course?.course_banner_image);
    }
  },[course]);


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(URL.createObjectURL(file)); // Create a preview of the filefile);
      const fileName = Date.now() + ".jpg";
      const storageRef = ref(storage, "ai-course-gen-images/"+fileName);
      await uploadBytes(storageRef, file).then((snapshot)=>{
        console.log('Upload File Completed');
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          // console.log(`Image URL: ${downloadUrl}`);
          course.course_banner_image = downloadUrl;
          const response = await fetch(`${url}/api/update_course_details`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
          });
          const updatedCourse = await response.json();
          // console.log(updatedCourse);
        })
      });
    }
  }
  return (
    <div>
        <div className="p-10 border rounded-xl shadow-sm mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h2 className="font-bold text-3xl">{course?.course_output?.["Course Name"]} 
                {edit &&  <EditCourseBasicInfo course={course} refreshData={refreshData}/> }
                </h2>
                <p className="text-sm text-gray-400 mt-3">{course?.course_output?.["Description"]}</p>
                <h2 className="font-medium mt-2 flex gap-2 items-center text-primary"><HiOutlinePuzzle />{course?.category}</h2>
                {!edit && <Link href={"/course/"+course?.course_id+"/start"}>
                  <Button className="w-full mt-5">Start</Button>
                </Link>}
              </div>
              <div>
                <label htmlFor="upload-image">
                  <Image 
                    src={selectedFile?selectedFile: "/placeholder.png"}
                    width={200} height={200} 
                    alt="course" 
                    className="w-full rounded-xl h-[250px] object-cover cursor-pointer"/>
                </label>
                {edit && <input type="file" id="upload-image" className="opacity-0" onChange={handleFileUpload}/>}
              </div>              
            </div>
        </div>
    </div>
  )
}
