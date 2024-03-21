import { AuthResponse } from '../models/authResponse.model';
import { AuthenticatedUser } from '../models/authUser.model';
import { User } from '../models/user.model';

export interface AuthState {
  user: AuthenticatedUser | null;
  
}
export const initialState: AuthState = {
  user: null,
};
