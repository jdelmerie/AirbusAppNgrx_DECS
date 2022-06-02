import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthGuardService } from './services/auth-guard.service';
import { Logout } from './store/actions/auth.actions';
import { AuthState } from './store/auth.states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airbus-app-ngrx';
  authState$: Observable<AuthState> | null = null;
  isAuth: boolean = false;

  constructor(private store: Store<any>, private authGuard: AuthGuardService,  public router: Router) {}

  ngOnInit(): void {
    this.authState$ = this.store.pipe(map((state) => state.authState));

    this.authState$?.subscribe((__values) => {
      this.isAuth = __values.isAuth ? true : false;
      //protect routes
      if (!__values.isAuth) {
        this.authGuard.canActivate(false);
      }

      if (localStorage.getItem('userConnected') != null) {
        this.isAuth = true;
        this.router.navigateByUrl('aircrafts');
      } else {
        this.isAuth = false;
        this.router.navigateByUrl('login');
      }
    });
  }

  onLogout() {
    this.store.dispatch(new Logout('Bye bye'));
  }
}
