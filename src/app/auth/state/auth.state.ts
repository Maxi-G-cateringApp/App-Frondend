import { AuthenticatedUser } from "../../model/authUser.model";
import { User } from "../../model/user.model";


export interface AuthState {
    user: AuthenticatedUser | null
}
export const initialState: AuthState = {
    user: null
};