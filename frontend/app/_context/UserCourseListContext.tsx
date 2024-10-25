import { createContext } from "react";
import { UserCourseListContextType } from "@/lib/type";

export const UserCourseListContext = createContext<UserCourseListContextType | undefined>(
  undefined
);
