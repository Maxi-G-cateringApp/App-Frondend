import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '../models/authUser.model';
import { AuthResponse } from '../models/authResponse.model';
import { AuthReducer } from '../state/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  formatUser(data: AuthResponse): AuthenticatedUser{
    const user = new AuthenticatedUser(data.user.id,data.user.username,data.token,data.user.role,data.user.email,data.user.phoneNumber)
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
      const user = new AuthenticatedUser(userData.id, userData.username,userData.token,userData.role,userData.email,userData.phoneNumber);
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
