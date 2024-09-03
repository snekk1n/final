import axios from "axios";

export const $api = axios.create({
    baseURL: "https://baibolj.pythonanywhere.com/api/"
});