
export interface SharedState {
    showLoading: boolean | undefined;
    errorMessage: string;
}

export const initialState: SharedState = {
    showLoading: false,
    errorMessage:'',

}