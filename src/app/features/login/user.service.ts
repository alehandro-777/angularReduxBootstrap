import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

 
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
 
  login(username:string, password:string): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl + '/auth/loginc', {username, password}, { withCredentials: true })
      .pipe(map((user) => user));
  }

  logout() {
    return this.http.post(environment.apiBaseUrl + '/auth/logout', {}, { withCredentials: true });
  } 
}