import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { GetUsers } from 'src/app/store/actions/auth.actions';
import { AuthState } from 'src/app/store/auth.states';
import { checkLogin } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  user: User = new User(0, '', '', []);

  authState$: Observable<AuthState> | null = null;
  isAuth$: Observable<boolean> | undefined;

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    });
    this.isAuth$ = this.store.select(checkLogin);
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const payload = {
        email: form.value.email,
        pwd: form.value.pwd,
      };
      console.log('dans le login component ');
      this.store.dispatch(new GetUsers(payload));

      this.authState$ = this.store.pipe(
        map((state) => state.authState)
      );
    }
  }
}
