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

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.host + '/users');
  }

  // public getUser(email: string, pwd: string): Observable<any> {
  //   console.log("DANS LE SERVICE : " + email + " " + pwd)
  //   return this.http
  //     .get<User>(environment.host + '/users?email=' + email + '&pwd=?' + pwd)
  //     .pipe(
  //       tap((res: User) => {
  //         if (res.email == email && res.pwd == pwd) {
  //           console.log('user exist');
  //         } else {
  //           console.log("user doesn't exist");
  //         }
  //       })
  //     );
  // }
}
