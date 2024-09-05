import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../api.js";

export const registerByEmail = createAsyncThunk(
    "authByEmail/register",
    async (data, thunkAPI) => {
        try {
            const response = await $api.post("register/", data)
            localStorage.setItem("refresh", response.data.refresh)
            localStorage.setItem("access", response.data.access)
            return thunkAPI.fulfillWithValue(response)

        } catch (error) {
            return thunkAPI.rejectWithValue("Авторизация не прошла!");
        }
    }
)