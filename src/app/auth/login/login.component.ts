import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/authService/auth-service.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { loginStart } from '../state/auth.action';
import { LoginData } from '../../model/loginReq.model';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  imgPath: string = "/assets/food-4511335_1920.jpg";

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>,
    private tost: ToastrService
  ) {}

  loginForm!: FormGroup;



  ngOnInit(): void{
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLoginUser() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({ username, password }));
  }



}
