import React from 'react';
import { Chapters, ChapterDetails } from '@/configs/schema'; 
import YouTube from 'react-youtube';
import Markdown from 'react-markdown'

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    }
};

export default function ChapterContent({chapter, content}: {chapter:ChapterDetails, content: Chapters}) {
    // console.log(`video id: ${content?.video_id}`);
    

  return (
    <div className="p-10">
        <h2 className="font-medium text-2xl">{chapter?.["Chapter Name"]}</h2>
        <p className="text-gray-500">{chapter?.["About"]}</p>

        {/* Video */}
        <div className="flex justify-center my-6">
            <YouTube
                videoId={content?.video_id}
                opts={opts}
            />
        </div>
        <div>
            {content?.content?.map((item, index) => (
                <div className="p-5 bg-slate-50 mb-3 rounded-lg">
                    <h2 className="font-medium text-lg">{item?.title}</h2>
                    {/* <p className="whitespace-pre-wrap">{item?.explanation}</p> */}
                    <Markdown>{item?.explanation}</Markdown>
                    {item?.code_example && <div className="p-4 bg-black text-white rounded-md mt-3">
                        <pre>{item.code_example}</pre>
                    </div>}
                </div>
            ))}
        </div>
    </div>
  )
}
