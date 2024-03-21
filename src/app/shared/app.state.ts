import { AuthReducer } from '../pages/auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../pages/auth/state/auth.selector';
import { AuthState } from '../pages/auth/state/auth.state';
import { SharedReducer } from './store/shared.reducer';
import { SHARED_STATE_NAME } from './store/shared.selector';
import { SharedState } from './store/shared.state';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer,
};
