import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.state';
import { loginStart, loginSuccess } from '../../state/auth.action';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
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


  constructor(
    private store: Store<AuthState>,
    private auth: AuthService,
    private masterService: MasterService,
    private router: Router,
  ) {
    console.log('login component');
  }

  loginForm!: FormGroup;

  ngOnInit(): void {
   
    this.showErrorMessage = this.store.select(getErrorMessage);

    google.accounts.id.initialize({
      client_id:
        '527124445285-2fo34e8jg723jaaemr4b0bnnq3jdoq8b.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size: 'small',
      shape: 'rectangle',
      wigth: 300
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required ,Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }



  handleLogin(response: any){
    if(response){
      this.masterService.googleLogin(response.credential).subscribe((data)=>{
        const user = data.user;
        this.store.dispatch(loginSuccess({ user }))
        localStorage.setItem('user',JSON.stringify(user))
        this.router.navigate(['user/home'])
        
      })
    }
  }

  onLoginUser() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }






  

   // this.getUrl()
  // getUrl(){
  //   this.masterService.getUrl().subscribe((data: any)=>{
  //     this.url = data.url;
  //     console.log(this.url);

  //   })
  // }
  // onGoogleLogin(){
  //   this.getUrl()
  // }

      // private decodeToken(token: string){
    //   return JSON.parse(atob(token.split(".")[1]));
  
    // }

    // const user = this.decodeToken(response.credential)
    //     localStorage.setItem('user',JSON.stringify(user))
}
