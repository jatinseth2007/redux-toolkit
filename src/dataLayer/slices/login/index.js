import { loginUserHandler } from "../../../utils/login";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
}

/**
 * Async action handlers
 */
export const loginUser = createAsyncThunk(
    'login/loginUser',
    loginUserHandler
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.errorMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
    }
});

//export actions
export const { reset } = loginSlice.actions;

export default loginSlice.reducer;