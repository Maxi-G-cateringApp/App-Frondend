import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerificationResponse } from '../../models/verificationResponse.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.state';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { Observable } from 'rxjs';
import { getErrorMessage } from '../../../../shared/store/shared.selector';

const phonePattern = /^\d{10}$/;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  imgPath: string = '/assets/tablecloth-3336687_1920.jpg';
  otpField: boolean = false;
  showErrorMessage!: Observable<string>;
  constructor(
    private masterService: MasterService,
    private router: Router,
    private fb: FormBuilder,
    private tost: ToastrService,
    private store: Store<AuthState>
  ) {}

  registerForm!: FormGroup;
  email: string = '';

  ngOnInit(): void {
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, this.whiteSpaceValidator]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(phonePattern)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.whiteSpaceValidator]],
      confirmPassword: ['', [Validators.required, this.whiteSpaceValidator]],
      otp: [''],
    });
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

  onRegisteruser() {
    if (!this.otpField) {
      if (this.registerForm.valid && this.passwordMatch()) {
        this.masterService
          .register(this.registerForm.value)
          .subscribe((response) => {
            this.email = response.email;
            if (response !== null) {
              this.tost.success(
                'Otp sent to your registered email',
                'Otp sent'
              );
              this.otpField = true;
            } else {
              console.log('response null');
            }
          });
      } else {
        this.tost.error('Something went wrong please try again');
      }
    } else {
      this.onVerify(this.email);
    }
  }

  onVerify(email: string) {
    const otp = this.registerForm.get('otp')?.value;

    if (otp && email) {
      this.masterService.verifyAccount(otp, email).subscribe(
        (response) => {
          if (response != null && response.status === true) {
            this.tost.success('Registered Success', 'sucesssss');
            this.router.navigateByUrl('/auth');
          } else {
            this.tost.error(
              'Verification failed please try again',
              'otp failed'
            );
            console.error('Verification failed:', response.message);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  passwordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
