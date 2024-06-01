import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccess, logout, updateUser, updateUsersuccess } from './auth.action';
import { state } from '@angular/animations';
import { AuthenticatedUser } from '../models/authUser.model';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };   
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),

  on(updateUsersuccess,(state,{ user })=>({
    ...state,
     user: { ...state.user, ...user } as unknown as AuthenticatedUser
  }))
  
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
