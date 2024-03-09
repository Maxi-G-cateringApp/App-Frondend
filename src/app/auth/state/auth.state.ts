import { AuthenticatedUser } from "../../model/authUser.model";
 

export interface AuthState {
    user: AuthenticatedUser | null
}
export const initialState: AuthState = {
    user: null
};