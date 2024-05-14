import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.state';
import { googleLogin, loginStart } from '../../state/auth.action';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getErrorMessage } from '../../../../shared/store/shared.selector';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  imgPath: string = '/assets/food-4511335_1920.jpg';
  url: string = '';
  showErrorMessage!: Observable<string>;
  hide = true;

  constructor(
    private store: Store<AuthState>,
  ) {
    console.log('login component');
  }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);

    google.accounts.id.initialize({
      client_id:
        '527124445285-2fo34e8jg723jaaemr4b0bnnq3jdoq8b.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'small',
      shape: 'Pill',
      wigth: 400,
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  handleLogin(response: any) {
    if (response) {
      const token = response.credential;
        this.store.dispatch(googleLogin({ token }));
    }
  }

  onLoginUser() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({ email, password }));
  }



}
