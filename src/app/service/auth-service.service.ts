import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { LoginData } from '../model/loginReq.model';
import { AuthResponse } from '../model/authResponse.model';

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
}
