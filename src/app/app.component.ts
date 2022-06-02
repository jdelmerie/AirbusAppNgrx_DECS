import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
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

  constructor(private store: Store<any>) {
    console.log(this.isAuth)
  }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(map((state) => state.authState));
    this.authState$?.subscribe((__values) => {
      this.isAuth = __values.isAuth ? true : false;
    });

  }

  onLogout() {
    console.log("logout user")
  }
}
