export interface SubjectDTO {
    id: number;
    code: string;
    name: string;
    credits: number;
    //courses: CourseDTO[];
}

export interface InstructorDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
}

export interface StudentDTO {
    id: number;
    neptunCode: string;
    firstName: string;
    lastName: string;
    email: string;
    currentSemester: number;
    class: string;
}

export interface CourseDTO {
    id: number;
    subject: SubjectDTO;
    semester: number;
    year: number;
}

export interface StudentCourseDTO {
    id: number;
    student: StudentDTO;
    course: CourseDTO;
    grade?: number;
}