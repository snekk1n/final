import axios from "axios";

export const $api = axios.create({
    baseURL: "https://ash2521.pythonanywhere.com/"
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`
    return config
})