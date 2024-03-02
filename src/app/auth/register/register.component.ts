import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){}
 
  registerForm!: FormGroup

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      username: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      email: ['',Validators.required,Validators.email],
      password: ['',Validators.required],
    })
   
  }


  onRegisteruser(){
   this.authService.register(this.registerForm.value).subscribe(
    (response)=>{
      if(response!=null){
          this.router.navigateByUrl("/login")
      }
    }
   );
  }


}
