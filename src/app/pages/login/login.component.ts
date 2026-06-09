import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {Credentials} from '../../core/models/credentials';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {first} from 'rxjs';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {loadOffers} from '../../store/offer/actions/offer.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]],
  });

  public ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(first(status => status === AuthorizationStatus.AUTH))
      .subscribe(() => {
      this.loginForm.reset();
      this.store.dispatch(loadOffers());
      this.router.navigate([AppRoute.MAIN]);
    })
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: Credentials = this.loginForm.value;
      this.store.dispatch(login({credentials}))
    }
  }

  public get passwordControl() {
    return this.loginForm.get('password')
  }

  public get emailControl() {
    return this.loginForm.get('email')
  }
}
