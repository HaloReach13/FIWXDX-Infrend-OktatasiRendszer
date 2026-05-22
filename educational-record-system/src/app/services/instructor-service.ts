import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InstructorDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<InstructorDTO[]>('/api/instructors');
  }
}
