// types/course.ts
export interface ICourse {
    _id: string;
    name: string;
    description: string;
    price: number;
    // Add other fields as necessary
}

export interface ICourseProps {
    course: ICourse;
}
