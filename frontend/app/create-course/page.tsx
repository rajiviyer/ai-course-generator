"use client";
import { HiMiniSquares2X2, HiClipboardDocumentCheck } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useContext } from "react";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { GenerateCourseLayoutAI } from "@/configs/AIModels";
import LoadingDialog from "./_components/LoadingDialog";
import { CourseList, CourseLayout } from "@/configs/schema";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "@/app/_context/UserContext";

export default function CreateCourse() {

  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 1,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const userInputContext = useContext(UserInputContext);
  const userContext = useContext(UserContext);

  if (!userInputContext) {
    throw new Error(
      "TopicDescription must be used within a UserInputContext.Provider"
    );
  }

  if (!userContext) {
    throw new Error(
      "User must be used within a UserContext.Provider"
    );
  }  

  const [userCourseInput, setUserCourseInput] = userInputContext;
  const [user, setUser] = userContext;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    // console.log(`active index : ${activeIndex}`);
    // console.log(`userCourseInput : ${userCourseInput}`);

    if (Object.keys(userCourseInput).length == 0) {
      return true;
    }

    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }

    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    }

    if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapters == undefined)
    ) {
      return true;
    }

    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      `
      Generate a course tutorial as follows:
      Fields are Course Name, Description, Chapter Name, About, Duration

      `
    const USER_INPUT_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      ", Level: " +
      userCourseInput?.level +
      ", Duration: " +
      userCourseInput?.duration +
      ", No of Chapters: " +
      userCourseInput?.noOfChapters;
    const OUTPUT_PROMPT = "\nOutput Format: JSON";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT + OUTPUT_PROMPT;
    // console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayoutAI.sendMessage(FINAL_PROMPT);
    // console.log(JSON.parse(result?.response?.text()));
    setLoading(false);
    SaveCourseLayoutInDB(JSON.parse(result?.response?.text()));
  };

  const SaveCourseLayoutInDB = async (courseLayout: CourseLayout) => {
    try {
      setLoading(true);
      var id = uuidv4();
      const courseList: CourseList = {
        name: userCourseInput.topic ?? "default topic",
        level: userCourseInput.level ?? "default level",
        include_video: userCourseInput.displayVideo ?? "No",
        category: userCourseInput.category ?? "default category",
        course_output: courseLayout,
        created_by: user?.user_email ?? "unknown",
        username: user?.user_name ?? "unknown",
        course_banner_image: "",
        publish: false,
      };
 
      // console.log(`include_video: ${courseList.include_video}`);
      
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/api/add_course_list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseList),
      });
      const courseId = await response.json();

      setLoading(false);

      if (courseId) {
        // console.log(courseId);
        router.replace("/create-course/"+courseId); 
        // console.log("No result found");
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((option, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-primary"
                  }`}
                >
                  {option.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{option.name}</h2>
              </div>
              {index != StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}
