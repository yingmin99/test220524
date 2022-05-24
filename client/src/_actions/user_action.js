import axios from "axios";
import {
    LOGIN_USER,
    NAVER_LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    FIND_USER,
    GENERATE_TOKEN,
    IS_EMAIL_SENT,
    DELETE_TOKEN,
    RESET_PASSWORD,
} from "./types";

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function naverLoginUser(dataToSubmit) {
    const request = axios.post('/api/users/naverLogin', dataToSubmit)
        .then(response => response.data)

    return {
        type: NAVER_LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function findUser(dataToSubmit) {
    const request = axios.post('/api/users/findUser', dataToSubmit)
        .then(response => response.data)

    return {
        type: FIND_USER,
        payload: request
    }
}

export function generateToken(dataToSubmit) {
    const request = axios.post('/api/users/generateToken', dataToSubmit)
        .then(response => response.data)

    return {
        type: GENERATE_TOKEN,
        payload: request
    }
}

export function isEmailSent(dataToSubmit) {
    const request = axios.post('/api/users/isEmailSent', dataToSubmit)
        .then(response => response.data)

    return {
        type: IS_EMAIL_SENT,
        payload: request
    }
}

export function deleteToken(dataToSubmit) {
    const request = axios.post('/api/users/deleteToken', dataToSubmit)
        .then(response => response.data)

    return {
        type: DELETE_TOKEN,
        payload: request
    }
}

export function resetPassword(dataToSubmit) {
    const request = axios.post('/api/users/resetPassword', dataToSubmit)
        .then(response => response.data)

    return {
        type: RESET_PASSWORD,
        payload: request
    }
}

export function auth() { //get method는 body 부분이 필요가 없다.
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}