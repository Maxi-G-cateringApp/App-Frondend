import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { LoginData } from '../model/loginReq.model';
import { AuthResponse } from '../model/authResponse.model';
import { AuthenticatedUser } from '../model/authUser.model';
import { VerificationResponse } from '../model/verificationResponse.model';

const BASIC_URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient) { }

  register(userRegistration:User): Observable<User>{
    return this.http.post<User>(BASIC_URL+"/register",userRegistration)
  }

  login(username: LoginData,password: LoginData):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(BASIC_URL + "/login",{username,password})
  }

  verifyAccount(otp: string,email: string):Observable<VerificationResponse>{
    return this.http.post<VerificationResponse>(BASIC_URL + "/verify-account",{email,otp})
  }

  formatUser(data: AuthResponse): AuthenticatedUser{
    const user = new AuthenticatedUser(data.user.id,data.user.username,data.token)
    return user;
  }

  saveUserInLocalStorage(user: AuthenticatedUser){
  localStorage.setItem('user',JSON.stringify(user))
  }

  removeUserFromLocalStorage(){
    localStorage.removeItem;
  }

  getUserFromLocalStorage(){
    const userDataString = localStorage.getItem("user");
    if(userDataString){
      const userData = JSON.parse(userDataString)
      const user = new AuthenticatedUser(userData.id, userData.username,userData.token);
      return user;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('user');
  }
}
