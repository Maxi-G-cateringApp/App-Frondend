import { createAction, props } from "@ngrx/store";
import { LoginData } from "../models/loginReq.model";
import { AuthenticatedUser } from "../models/authUser.model";



export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';

export const loginStart = createAction(LOGIN_START,props<{username:LoginData,password:LoginData}>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user: AuthenticatedUser | null}>());
export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const logout = createAction(LOGOUT_ACTION);