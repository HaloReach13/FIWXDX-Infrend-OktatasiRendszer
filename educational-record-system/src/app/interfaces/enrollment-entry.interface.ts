export interface EnrollmentEntry {
  enrollmentId: number;
  grade: number | null;
  student: {
    id: number;
    neptunCode: string;
    firstName: string;
    lastName: string;
    email: string;
    class: string;
    currentSemester: string;
  };
}