import { HttpClient } from '@angular/common/http';
import { inject ,Injectable } from '@angular/core';
import { StudentDTO } from '../../../models';
import { StudentCourseEntry, StudentAverage, ClassAverage } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<StudentDTO[]>('/api/students');
  }

  getOne(id: number) {
    return this.http.get<StudentDTO>(`/api/students/${id}`)
  }

  getCourses(id: number) {
    return this.http.get<StudentCourseEntry[]>(`/api/students/${id}/courses`);
  }
 
  getAverage(id: number) {
    return this.http.get<StudentAverage>(`/api/students/${id}/average`);
  }

  getClassAverage(className: string) {
    return this.http.get<ClassAverage>(`/api/students/class-average/${className}`);
  }
  
  create(instructor: StudentDTO) {
    return this.http.post('/api/students', instructor);
  }

  update(instructor: StudentDTO) {
    return this.http.put('/api/students', instructor);
  }

  delete(id: number) {
    return this.http.delete(`/api/students/${id}`);
  }
}
