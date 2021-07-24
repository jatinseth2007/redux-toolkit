import { registerUser } from "../../../utils/register";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
};

/**
 * Async action handlers
 */
export const registerUserAction = createAsyncThunk(
    "register/registerUser",
    registerUser
);

const registerSlice = createSlice({
    name: "register",
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
            .addCase(registerUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
            })
            .addCase(registerUserAction.fulfilled, (state) => {
                state.loading = false;
                state.error = false;
                state.errorMessage = "";
            })
    }
});

export const { reset } = registerSlice.actions;

export default registerSlice.reducer;