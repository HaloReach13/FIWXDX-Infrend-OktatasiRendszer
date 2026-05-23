import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CourseEntry, EnrollmentEntry, SetGradeRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  http = inject(HttpClient);
 
  getAll() {
    return this.http.get<CourseEntry[]>('/api/courses');
  }
 
  getOne(id: number) {
    return this.http.get<CourseEntry>(`/api/courses/${id}`);
  }
 
  getStudents(id: number) {
    return this.http.get<EnrollmentEntry[]>(`/api/courses/${id}/students`);
  }
 
  create(course: { subjectId: number; semester: string; year: number }) {
    return this.http.post<CourseEntry>('/api/courses', course);
  }
 
  update(course: CourseEntry) {
    return this.http.put<CourseEntry>('/api/courses', course);
  }
 
  delete(id: number) {
    return this.http.delete(`/api/courses/${id}`);
  }
 
  enrollStudent(courseId: number, studentId: number) {
    return this.http.post(`/api/courses/${courseId}/students/${studentId}`, {});
  }
 
  unenrollStudent(courseId: number, studentId: number) {
    return this.http.delete(`/api/courses/${courseId}/students/${studentId}`);
  }
 
  setGrade(courseId: number, studentId: number, grade: number) {
    return this.http.put<SetGradeRequest>(`/api/courses/${courseId}/students/${studentId}/grade`, { grade });
  }
}
