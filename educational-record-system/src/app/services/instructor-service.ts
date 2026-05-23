import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InstructorDTO, SubjectDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<InstructorDTO[]>('/api/instructors');
  }

  getOne(id: number) {
    return this.http.get<InstructorDTO>(`/api/instructors/${id}`)
  }

  getSubjects(id: number) {
    return this.http.get<SubjectDTO[]>(`/api/instructors/${id}/subjects`);
  }
  
  create(instructor: InstructorDTO) {
    return this.http.post('/api/instructors', instructor);
  }

  update(instructor: InstructorDTO) {
    return this.http.put('/api/instructors', instructor);
  }

  delete(id: number) {
    return this.http.delete(`/api/instructors/${id}`);
  }
}
