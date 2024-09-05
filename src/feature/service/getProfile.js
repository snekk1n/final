import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../api.js";

export const getProfile = createAsyncThunk(
    "getProfile",
    async (_, thunkAPI) => {
        try {
            const response = await $api.get("/profile");
            console.log(response.data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            return thunkAPI.rejectWithValue("не получилось получить данные профиля");
        }
    }
);