import {createSlice} from "@reduxjs/toolkit";
import {loginByEmail} from "../service/loginByEmail.js";
import {registerByEmail} from "../service/registerByEmail.js";

const initialState = {
    username: "",
    phone_number: "",
    password: "",
    password2: "",
    isLoading: false,
    errors: [],
    successLogin: false,
    successRegister: false,

}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        set: (state, action) => {
           if (action.type === "SET_USERNAME") {
               state.username = action.payload.username;
           } else if (action.type === "SET_PASSWORD") {
               state.password = action.payload.password;
           } else if (action.type === "SET_PASSWORD2") {
               state.password2 = action.payload.password;
           }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.successLogin = true
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = state.errors.push(action.payload);
            });
        builder
            .addCase(registerByEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerByEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.successRegister = true
            })
            .addCase(registerByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = state.errors.push(action.payload);
            })

    }
})

export const {
    name: authSliceReducerName,
    reducer: authSliceReducer,
    actions: authSliceActions,
} = authSlice;