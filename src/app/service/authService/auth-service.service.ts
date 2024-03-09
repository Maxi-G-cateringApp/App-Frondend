import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import {  Observable } from 'rxjs';
import { LoginData } from '../../model/loginReq.model';
import { AuthResponse } from '../../model/authResponse.model';
import { AuthenticatedUser } from '../../model/authUser.model';
import { VerificationResponse } from '../../model/verificationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  register(userRegistration:User): Observable<User>{
    return this.http.post<User>('/register',userRegistration)
  }

  login(username: LoginData,password: LoginData):Observable<AuthResponse>{
    return this.http.post<AuthResponse>('/login',{username,password})
  }


  verifyAccount(otp: string,email: string):Observable<VerificationResponse>{
    return this.http.post<VerificationResponse>('/verify-account',{email,otp})
  }

  formatUser(data: AuthResponse): AuthenticatedUser{
    const user = new AuthenticatedUser(data.user.id,data.user.username,data.token,data.user.role)
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
      const user = new AuthenticatedUser(userData.id, userData.username,userData.token,userData.role);
      return user;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  setTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }
}
