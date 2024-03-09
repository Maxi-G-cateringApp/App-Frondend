import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/authService/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  imgPath: string = "/assets/tablecloth-3336687_1920.jpg";
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private tost: ToastrService
  ) {}

  registerForm!: FormGroup;
  email: string = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.min(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onRegisteruser() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((response) => {
          this.email = response.email;
          if (response !== null) {
            this.tost.success('Registered Success','sucesssss')
            this.router.navigate(['/auth/verify-account', this.email]);
          }else{
            console.log("response null");
          }
        });
    }else{
      console.log("not valid");
    }
  }
}
