import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineHome,
} from "react-icons/hi2";
export default function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image alt="" src={"/favicon.svg"} width={25} height={25} />
      <Link href="/dashboard">
        <div className="text-2xl"><HiOutlineHome /></div>
      </Link>
    </div>
  );
}
