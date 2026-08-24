import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "./features/toast/toastSlice";
import authReducer from "./store/authSlice";
export const store = configureStore({

    reducer: {
        auth: authReducer,
        toast: toastReducer
    }

});