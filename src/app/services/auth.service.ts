import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getUser(email: string, pwd: string): Observable<User[]> {
    return this.http.get<User[]>(
      environment.host + '/users?email=' + email + '&pwd=' + pwd
    );
  }

  public saveCurrentUser(user: User) {
    if (user) {
      localStorage.setItem('userConnected', btoa(JSON.stringify(user)));
    }
  }
}
