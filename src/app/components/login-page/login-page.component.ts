import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { GetUser } from 'src/app/store/actions/auth.actions';
import { AuthState, AuthStateEnum } from 'src/app/store/auth.states';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  user: User = new User(0, '', '', []);

  authState$: Observable<AuthState> | null = null;
  readonly authStateEnum = AuthStateEnum;
  isAuth: boolean = false;
  displayError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    });
  }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(map((state) => state.authState));
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const payload = {
        email: form.value.email,
        pwd: form.value.pwd,
      };
      this.store.dispatch(new GetUser(payload));
      this.authState$?.subscribe((__values) => {
        if (__values.user && __values.isAuth == true) {
          this.isAuth = true;
          this.user = __values.user;
          this.router.navigateByUrl('aircrafts');
        } else {
          this.displayError = true;
        }
      });
    }
  }
}
