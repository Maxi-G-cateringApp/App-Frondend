import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '../models/authUser.model';
import { AuthResponse } from '../models/authResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  formatUser(data: AuthResponse): AuthenticatedUser {
    const user = new AuthenticatedUser(
      data.user.id,
      data.user.userName,
      data.token,
      data.user.role,
      data.user.email,
      data.user.phoneNumber
    );
    return user;
  }

  saveUserInLocalStorage(user: AuthenticatedUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  saveUserRoleInLocalStorage(role: string) {
    localStorage.setItem('role', JSON.stringify(role));
  }

  getRoleInLocalStorage() {
    const role = localStorage.getItem('role');
    return role;
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem;
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new AuthenticatedUser(
        userData.id,
        userData.username,
        userData.token,
        userData.role,
        userData.email,
        userData.phoneNumber
      );
      return user;
    }
    return null;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'unauthorized':
        return 'Invalid Email or password';
      case 'INVALID_PASSWORD':
        return 'Invalid Email';
      default:
        return 'Unknown Error Occurred Please try again';
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }

  setTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  setRefreshTokenInLocalStorage(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }
}
