import { createContext } from "react";
import { UserInputContextType } from "@/lib/type";

export const UserInputContext = createContext<UserInputContextType | undefined>(
  undefined
);
