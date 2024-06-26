import { createAction, props } from "@ngrx/store";
import { LoginData } from "../models/loginReq.model";
import { AuthenticatedUser } from "../models/authUser.model";
import { User } from "../models/user.model";
import { UpdateUser } from "../../user/models/update-user.model";



export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';
export const GOOGLE_LOGIN = '[auth page] google login';
export const UPDATE_USER = '[auth page] update user'
export const UPDATE_USER_SUCCESS = '[auth page] update user';


export const loginStart = createAction(LOGIN_START,props<{email:LoginData,password:LoginData}>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user: AuthenticatedUser | null}>());
export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const logout = createAction(LOGOUT_ACTION);
export const googleLogin = createAction(GOOGLE_LOGIN,props<{token: string}>());
export const updateUser = createAction(UPDATE_USER,props<{user:UpdateUser}>());
export const updateUsersuccess = createAction(UPDATE_USER_SUCCESS,props<{user:UpdateUser}>());
