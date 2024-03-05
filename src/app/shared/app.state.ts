import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";


export interface AppState {
    [AUTH_STATE_NAME]: AuthState;
}

export const appReducer = {
    [AUTH_STATE_NAME]: AuthReducer
}