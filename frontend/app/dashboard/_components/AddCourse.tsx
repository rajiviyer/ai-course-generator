"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { UserContext } from "@/app/_context/UserContext";
import { useContext } from "react";
export default function AddCourse() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext is not available');
  }
  const [ user, setUser] = userContext;
  const contextValue = useContext(UserCourseListContext);
    
  // Handle the case where the context might be undefined
  if (!contextValue) {
    throw new Error("UserCourseListContext is not provided");
  }

  const [userCourseList, setUserCourseList] = contextValue;
    
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl">
          Hello, <span className="font-bold">{user?.user_name}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new course with AI, share it with friends
        </p>
      </div>
      <Link href={userCourseList.length >= 5 ? "/dashboard/upgrade" : "/create-course"}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
}
