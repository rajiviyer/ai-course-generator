import { Button } from "@/components/ui/button";
import logo from "@/public/course.svg";

export default function Header() {
  return (
    <div className="flex justify-between p-4 shadow-md">
      <img alt="" src={logo.src} className="h-10" />
      <Button>Get Started</Button>
    </div>
  );
}
