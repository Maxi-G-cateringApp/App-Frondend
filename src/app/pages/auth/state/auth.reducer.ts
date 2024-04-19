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
  
    
  

  // on(updateUsersuccess, (state) => ({
  //   ...state,
  //   user: state.user
  // })),
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}

// on(updateUser,(state,action)=>{
//   const _user = {...action.user}
//   const updateUser = state.users.map(user => {
//       return _user.id === user.id?_user:user;
//   })
//   return{
//       ...state,
//       users:updateUser
//   }
// }),