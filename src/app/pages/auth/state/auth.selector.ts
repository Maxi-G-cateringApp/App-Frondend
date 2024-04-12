import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState,(state)=> {
    return state.user ? true: false;
});

export const getRole = createSelector(getAuthState,(state) =>{
    return state.user?.userRole
});

export const getEmailFromState = createSelector(getAuthState,(state) => {
    return state.user?.userEmail
})

export const getuserId = createSelector(getAuthState,(state) => {
    return state.user?.userId
})
export const getuserNameFromState = createSelector(getAuthState,(state) => {
    console.log(state.user?.userName);
    return state.user?.userName
})