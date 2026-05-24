import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO, AccessTokenDTO, AdministratorDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  http = inject(HttpClient);

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/administrators/login', data);
  }

  register(data: AdministratorDTO) {
    return this.http.post<AdministratorDTO>('/api/administrators/register', data);
  }
}
