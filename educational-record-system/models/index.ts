export interface SubjectDTO {
    id: number;
    code: string;
    name: string;
    credits: number;
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
    currentSemester: string;
    class: string;
}

export interface CourseDTO {
    id: number;
    subject: SubjectDTO;
    semester: string;
    year: number;
}

export interface StudentCourseDTO {
    id: number;
    student: StudentDTO;
    course: CourseDTO;
    grade?: number;
}