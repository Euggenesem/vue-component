import axios from "axios";

export const http = axios.create({
    baseURL: `https://www.universal-tutorial.com/api`,
    headers: {
        "Accept": "application/json"
    }
});