export interface StudentCourseEntry {
  studentCourseId: number;
  grade: number | null;
  course: {
    id: number;
    semester: string;
    year: number;
    subject: {
      id: number;
      code: string;
      name: string;
      credits: number;
    };
  };
}