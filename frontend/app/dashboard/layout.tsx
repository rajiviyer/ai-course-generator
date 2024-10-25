"use client";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { UserContext } from "../_context/UserContext";
import React, { useState, useEffect } from "react";
import { UserCourseList } from "@/lib/type";
import { User } from "@/configs/schema";
export default function DashboardLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  const [userCourseList, setUserCourseList] = useState<UserCourseList>([]);
  const [user, setUser] = useState<User>({user_email: "", user_name: ""});

  useEffect(() => {
    // Function to get a cookie value by name
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
       return decodeURIComponent(parts.pop()?.split(";").shift() || "");
      }
      return "";
    };

    // Debugging: log the cookies to see what is available
    // console.log("Current cookies:", document.cookie);

    // Get the user email and username from the cookies
    const userDetails: User = {
      user_email: getCookieValue("user_email"),
      user_name: getCookieValue("user_name"),
    }

    // console.log("User details from cookies:", userDetails);
    setUser(userDetails);

  }, []);

  return (
    <UserCourseListContext.Provider value={[userCourseList, setUserCourseList]}>
      <UserContext.Provider value={[user, setUser]}>
      <div>
        <div className="md:w-64 hidden md:block">
          <SideBar />
        </div>
        <div className="md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </div>
      </UserContext.Provider>
    </UserCourseListContext.Provider>
  );
}
