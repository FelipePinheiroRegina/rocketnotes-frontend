import axios from "axios"

export const api = axios.create({
    baseURL: "https://rocketnotes-backend-f6b8.onrender.com"
})