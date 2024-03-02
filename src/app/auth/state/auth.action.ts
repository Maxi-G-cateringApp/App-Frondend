import { createAction, props } from "@ngrx/store";
import { LoginData } from "../../model/loginReq.model";
import { User } from "../../model/user.model";
import { AuthResponse } from "../../model/authResponse.model";


export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';

export const loginStart = createAction(LOGIN_START,props<{username:LoginData,password:LoginData}>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user: AuthResponse}>());