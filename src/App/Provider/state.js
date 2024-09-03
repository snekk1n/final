import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "../../feature/slice/authSlice.js";

const rootReducer = combineReducers({
    auth: authSliceReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}