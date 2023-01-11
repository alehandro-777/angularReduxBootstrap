import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile, ProfileResponse, Role, RoleResponse, User, UserResponse, UsersPage } from './user.model';

 
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

  loadPage(skip:number, limit:number) : Observable<UsersPage> {
    return this.http.get<UsersPage>(environment.apiBaseUrl + `/users?skip=${skip}&limit=${limit}`, { withCredentials: true });
  }

  getById(id:number) : Observable<UserResponse> {
    return this.http.get<UserResponse>(environment.apiBaseUrl + `/users/${id}`, { withCredentials: true });
  }

  update(user:User) : Observable<UserResponse> {
    return this.http.put<UserResponse>(environment.apiBaseUrl + `/users`, user, { withCredentials: true });
  }

  create(user:User) : Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.apiBaseUrl + `/users`, user, { withCredentials: true });
  }

  getAllRoles() : Observable<Role[]> {
    return this.http.get<Role[]>(environment.apiBaseUrl + `/user-roles-fill-select`, { withCredentials: true });
  }

  getAllProfiles() : Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.apiBaseUrl + `/user-profiles-fill-select`, { withCredentials: true });
  }  

  gelRoleById(id:number) : Observable<RoleResponse> {
    return this.http.get<RoleResponse>(environment.apiBaseUrl + `/user-roles/${id}`, { withCredentials: true });
  }

  getProfileById(id:number) : Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(environment.apiBaseUrl + `/user-profiles/${id}`, { withCredentials: true });
  } 

}