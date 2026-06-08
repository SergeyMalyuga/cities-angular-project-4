import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {APIRoute, BASE_URL} from '../constants/const';
import {defaultHttpPipes} from '../utils/rjxs-operators';
import {Credentials} from '../models/credentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public checkAuth(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`).pipe(...defaultHttpPipes<User>());
  }

  public login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, credentials).pipe(...defaultHttpPipes<User>());
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.LOGOUT}`).pipe(...defaultHttpPipes<void>());
  }
}
