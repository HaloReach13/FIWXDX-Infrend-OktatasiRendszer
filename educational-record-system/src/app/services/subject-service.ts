import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SubjectDTO, InstructorDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<SubjectDTO[]>('/api/subjects');
  }

  getOne(id: number) {
    return this.http.get<SubjectDTO>(`/api/subjects/${id}`)
  }

  getInstructors(id: number) {
    return this.http.get<InstructorDTO[]>(`/api/subjects/${id}/instructors`);
  }
 
  assignInstructor(subjectId: number, instructorId: number) {
    return this.http.post(`/api/subjects/${subjectId}/instructors/${instructorId}`, {});
  }
 
  removeInstructor(subjectId: number, instructorId: number) {
    return this.http.delete(`/api/subjects/${subjectId}/instructors/${instructorId}`);
  }
  
  create(instructor: SubjectDTO) {
    return this.http.post('/api/subjects', instructor);
  }

  update(instructor: SubjectDTO) {
    return this.http.put('/api/subjects', instructor);
  }

  delete(id: number) {
    return this.http.delete(`/api/subjects/${id}`);
  }
}