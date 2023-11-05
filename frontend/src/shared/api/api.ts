import axios from 'axios';

export const $api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
};
