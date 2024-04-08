import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../../../auth/state/auth.state';
import { Store } from '@ngrx/store';
import { MasterService } from '../../../../core/services/master.service';
import { AuthService } from '../../../auth/service/auth-service.service';
import { Router } from '@angular/router';
import { loginStart } from '../../../auth/state/auth.action';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{

  adminLoginForm!: FormGroup

  constructor(private store: Store<AuthState>,
    private auth: AuthService,
    private masterService: MasterService,
    private router: Router,){

  }
  ngOnInit(): void {

    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required ,Validators.email]),
      password: new FormControl('', Validators.required),
    });
      

  }

  onAdminLogin(){
    const email = this.adminLoginForm.value.email;
    const password = this.adminLoginForm.value.password;
    this.store.dispatch(loginStart({ email, password }));
  }

}
