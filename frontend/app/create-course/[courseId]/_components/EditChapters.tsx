import { useState, useEffect } from 'react';
import { HiPencilSquare } from "react-icons/hi2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChapterInfoProps } from '@/configs/schema';

export default function EditChapters({ course, index, refreshData }: ChapterInfoProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if(course?.course_output?.["Chapters"][index]?.["Chapter Name"]) {
            setName(course?.course_output?.["Chapters"][index]?.["Chapter Name"]);
            setDescription(course?.course_output?.["Chapters"][index]?.["About"]);
        }
    },[course]);

    const onUpdateHandler = async () => {
        course.course_output["Chapters"][index]["Chapter Name"] = name;
        course.course_output["Chapters"][index]["About"] = description;
        const response = await fetch(`${url}/api/update_course_details`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
          });
          
        const updatedCourse = await response.json();
        // console.log(`updated course Chapter ${index}: ${JSON.stringify(updatedCourse)}`);
        refreshData();
    }
  return (
    <Dialog>
        <DialogTrigger><HiPencilSquare /></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Course Title & Description</DialogTitle>
            <DialogDescription>
                <div className="mt-3">
                    <label>Course Title</label>
                    <Input 
                        defaultValue={course?.course_output?.["Chapters"][index]?.["Chapter Name"]} 
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description</label>
                    <Textarea 
                        className="h-40" defaultValue={course?.course_output?.["Chapters"][index]?.["About"]} 
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>                             
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button onClick={onUpdateHandler}>Update</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
