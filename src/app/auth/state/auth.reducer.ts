import { createReducer, on } from "@ngrx/store"
import { initialState } from "./auth.state"
import { loginSuccess } from "./auth.action";


const _authReducer= createReducer(initialState, on(loginSuccess,(state,action)=> {
    return {
        ...state,
        user: action.user.user
        
    }
}));

export function AuthReducer(state: any,action: any){
    return _authReducer(state,action)
}