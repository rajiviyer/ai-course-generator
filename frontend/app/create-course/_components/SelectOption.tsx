import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { UserInputContext } from "@/app/_context/UserInputContext";
export default function SelectOption() {
  const userInputContext = useContext(UserInputContext);

  if (!userInputContext) {
    throw new Error(
      "SelectOption must be used within a UserInputContext.Provider"
    );
  }

  const [userCourseInput, setUserCourseInput] = userInputContext;

  const handleInputChange = (fieldName: string, value: string) => {
    setUserCourseInput((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">🎚️Difficulty Level</label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput.level}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">🕘Course Duration</label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput.duration}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Hours</SelectItem>
              <SelectItem value="2">2 Hours</SelectItem>
              <SelectItem value="3>">3+ Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">▶️Add Video</label>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput.displayVideo}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">📖No. of Chapters</label>
          <Input
            type="number"
            onChange={(event) =>
              handleInputChange("noOfChapters", event.target.value)
            }
            defaultValue={userCourseInput.noOfChapters}
          />
        </div>
      </div>
    </div>
  );
}
