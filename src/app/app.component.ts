import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthGuardService } from './services/auth-guard.service';
import { Logout } from './store/actions/auth.actions';
import { AuthState } from './store/auth.states';
import { selectIsConnected } from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airbus-app-ngrx';
  isAuth$: Observable<Boolean> | null = null;
  authState$: Observable<AuthState> | null = null;

  constructor(
    private store: Store<any>,
    private authGuard: AuthGuardService,
    public router: Router
  ) {
    this.isAuth$ = store.select(selectIsConnected);
  }

  ngOnInit(): void {
    //protect routes si user pas connecté peut pas accéder à l'appli
    if (this.isAuth$) {
      this.authGuard.canActivate(false);
    }

    if (localStorage.getItem('userConnected') != null) {
      this.router.navigateByUrl('aircrafts');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  onLogout() {
    this.store.dispatch(new Logout('Bye bye'));
    this.router.navigate(['login']);
  }
}
