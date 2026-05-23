export interface CourseEntry {
  id: number;
  semester: string;
  year: number;
  subject: {
    id: number;
    code: string;
    name: string;
    credits: number;
  };
  studentCount?: number;
}