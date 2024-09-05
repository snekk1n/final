import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../api.js";

export const fastAuthWithRefreshToken = createAsyncThunk(
    "fastAuthWithRefreshToken",
    async (token, thunkAPI) => {
        try {
            const response = await $api.post("token/refresh/", token);
            console.log(response.data)
            localStorage.setItem("access", response.data.access)
            return thunkAPI.fulfillWithValue(response)
        } catch (error) {
            return thunkAPI.rejectWithValue("Авторизация не прошла!");
        }
    }
)