import login from "./slices/login";
import register from "./slices/register";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        login,
        register
    }
});