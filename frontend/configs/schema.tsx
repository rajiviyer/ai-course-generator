export interface SignInType {
  user_email: string;
  user_passwd: string;
}

export interface SignUpType {
  user_email: string;
  user_passwd: string;
  user_name: string;
}

export interface ChapterDetails {
  "Chapter Name": string;
  "About": string;
  "Duration": string;
}

export interface CourseLayout {
  "Course Name": string;
  "Description": string;
  "Chapters": [ChapterDetails];
  "Category": string;
  "Topic": string;
  "Level": string;
  "Duration": string;
  "No of Chapters": number;
}
export interface CourseList {
  name: string;
  category: string;
  level: string;
  include_video: string;
  course_output: CourseLayout;
  created_by: string;
  username: string;
  course_banner_image: string;
  publish: boolean;
}

export interface CourseIdDetails {
  course_id: string;
  created_by: string;
}

export interface CourseLayoutProps {
  params: {
    courseId: string;
  };
}

export interface CourseDetails {
  id: number;
  course_id: string;
  name: string;
  category: string;
  level: string;
  include_video: string;
  course_output: CourseLayout;
  created_by: string;
  username: string;
  course_banner_image: string;
  publish: boolean;
}


export interface CourseUser {
  created_by: string;
  username: string;
}

export interface User {
  user_email: string;
  user_name: string;
}

export interface CourseInfoProps {
    course: CourseDetails,
    refreshData: () => void
}

export interface ChapterInfoProps {
  course: CourseDetails,
  index: number,
  refreshData: () => void
}

export interface ChapterContentType {
  title: string;
  explanation: string;
  code_example: string;
}

export type ChapterContentsType = ChapterContentType[];

export interface Chapters {
  course_id: string;
  chapter_id: number;
  content: ChapterContentsType;
  video_id: string;
}

export interface ChapterContentSearchProps {
  course_id: string;
  chapter_id: number;
}

export type UserCourseInput = {
  category?: string;
  topic?: string;
  description?: string;
  level?: string;
  duration?: string;
  displayVideo?: string;
  noOfChapters?: number;
};