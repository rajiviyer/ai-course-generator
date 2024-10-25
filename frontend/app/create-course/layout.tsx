"use client";
import Header from "../dashboard/_components/Header";
import { UserInputContext } from "../_context/UserInputContext";
import { UserContext } from "../_context/UserContext";
import { UserCourseInput, User } from "@/configs/schema";
import React, { useState, useEffect } from "react";
export default function CreateCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userCourseInput, setUserCourseInput] = useState<UserCourseInput>({});
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
    <div>
      <UserInputContext.Provider value={[userCourseInput, setUserCourseInput]}>
        <UserContext.Provider value={[user, setUser]}>
          <>
            <Header />
            {children}
          </>
        </UserContext.Provider>
      </UserInputContext.Provider>
    </div>
  );
}
