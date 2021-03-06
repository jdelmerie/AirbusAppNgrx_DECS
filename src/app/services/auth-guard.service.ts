import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(isAuth: any): boolean {
    if (!isAuth) {
      // alert('You are not allowed to view this page. Please login.');
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
