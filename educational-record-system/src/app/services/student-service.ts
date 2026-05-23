import { HttpClient } from '@angular/common/http';
import { inject ,Injectable } from '@angular/core';
import { StudentDTO } from '../../../models';

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
