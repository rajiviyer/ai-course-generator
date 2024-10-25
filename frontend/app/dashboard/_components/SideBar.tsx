"use client";
// import logo from "@/public/course.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useContext } from "react";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

import {
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlinePower,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
export default function SideBar() {
  const contextValue = useContext(UserCourseListContext);
    
  // Handle the case where the context might be undefined
  if (!contextValue) {
    throw new Error("UserCourseListContext is not provided");
  }

  const [userCourseList, setUserCourseList] = contextValue;
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    // {
    //   id: 3,
    //   name: "Upgrade",
    //   icon: <HiOutlineShieldCheck />,
    //   path: "/dashboard/upgrade",
    // },
    // {
    //   id: 4,
    //   name: "Logout",
    //   icon: <HiOutlinePower />,
    //   path: "/dashboard/logout",
    // },
  ];

  const path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src="/course.svg" alt="" height={160} width={100} />
      <hr className="my-5" />
      <ul>
        {Menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-4 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-2 ${
                item.path === path && "bg-gray-100 text-black"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length/5)*100} />
        <h2 className="text-sm my-2">{userCourseList?.length} Out of 5 Courses created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generation
        </h2>
      </div>
    </div>
  );
}
