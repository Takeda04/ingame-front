import axios from "axios";

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST!;

const $host = axios.create({
    baseURL: API_HOST,
});

export default $host;