import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GetUser } from 'src/app/store/actions/auth.actions';
import { AuthState, AuthStateEnum } from 'src/app/store/auth.states';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  authState$: Observable<AuthState> | null = null;
  readonly authStateEnum = AuthStateEnum;
  isAuth: boolean = false;
  displayError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    });
  }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(
      map((state) => {
        if (state.authState.isAuth) {
          this.authService.saveCurrentUser(state.authState.user);
          this.router.navigateByUrl('aircrafts');
        }
        return state.authState;
      })
    );
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const payload = {
        email: form.value.email,
        pwd: form.value.pwd,
      };
      this.store.dispatch(new GetUser(payload));
    }
  }
}
