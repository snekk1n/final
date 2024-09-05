import {createSlice} from "@reduxjs/toolkit";
import {loginByEmail} from "../service/loginByEmail.js";
import {registerByEmail} from "../service/registerByEmail.js";
import {fastAuthWithRefreshToken} from "../service/fastAuthWithRefreshToken.js";
import {getProfile} from "../service/getProfile.js";

const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
    isLoading: false,
    errors: [],
    successAuth: false,

}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        set: (state, action) => {
            const { payload : { type , payload  } } = action;

            console.log(type);

            state[type] = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.successAuth = true
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
                state.successAuth = true
            })
            .addCase(registerByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = state.errors.push(action.payload);
            });
        builder
            .addCase(fastAuthWithRefreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fastAuthWithRefreshToken.fulfilled, (state) => {
                state.isLoading = false;
                state.successAuth = true
            })
            .addCase(fastAuthWithRefreshToken.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.username = action.payload.username
                state.email = action.payload.email
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false
            })

    }
})

export const {
    name: authSliceReducerName,
    reducer: authSliceReducer,
    actions: authSliceActions,
} = authSlice;