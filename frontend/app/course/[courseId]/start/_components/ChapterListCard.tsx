import React from 'react';
import { ChapterDetails } from '@/configs/schema';
import { HiOutlineClock } from "react-icons/hi2";

export default function ChapterListCard({chapter, index}: {chapter: ChapterDetails, index: number}) {
  return (
    <div className="grid grid-cols-5 gap-1 items-center p-4 border-b">
        <div>
            <h2 className="p-1 bg-primary text-white rounded-full w-8 h-8 text-center">
                {index+1}
            </h2>
        </div>
        <div className="col-span-4">
            <h2 className="font-medium">{chapter?.["Chapter Name"]}</h2>
            <h2 className="flex gap-2 items-center text-sm text-primary"><HiOutlineClock />{chapter?.["Duration"]}</h2>
        </div>
    </div>
  )
}
