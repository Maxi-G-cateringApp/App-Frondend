import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authService/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { VerificationResponse } from '../../model/verificationResponse.model';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  email: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
    this.email = this.activateRoute.snapshot.paramMap.get('email');
    if (!this.email) {
      console.error('Email not retrieved from route');
    }
  }

  onVerify():void{
    if(this.otpForm.valid && this.email){
      this.authService.verifyAccount(this.otpForm.value.otp,this.email).subscribe((response:VerificationResponse)=>{
        if(response!=null && response.status === true){
          this.router.navigateByUrl('/auth')
        }else{
          console.error('Verification failed:', response.message);
        }
      },(error)=>{
              console.log("error", error)
            })
    }
  }
}
// onVerify():void{
//   if(this.otpForm.valid && this.email){
//     this.authService.verifyAccount(this.otpForm.value.otp,this.email).subscribe((response)=>{
//       if(response!=null){
//         this.router.navigateByUrl('/auth')
//       }
//     },
//     (error)=>{
//       console.log("error", error)
//     })
//   }
// }