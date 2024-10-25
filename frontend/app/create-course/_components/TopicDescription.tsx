import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";
import { UserInputContext } from "@/app/_context/UserInputContext";

export default function TopicDescription() {
  const userInputContext = useContext(UserInputContext);

  if (!userInputContext) {
    throw new Error(
      "TopicDescription must be used within a UserInputContext.Provider"
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
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <label>
          💡Write the topic for which you want to generate a course (E.g. Python
          Programming, Yoga etc.)
        </label>
        <Input
          placeholder={"Topic"}
          className="h-14 text-xl"
          defaultValue={userCourseInput.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label>
          📝Write a brief description of the topic. Anything you may want to
          include in the course (Optional)
        </label>
        <Textarea
          placeholder="About your course"
          className="h-24 text-xl"
          defaultValue={userCourseInput.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
