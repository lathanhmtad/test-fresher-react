import axios from "axios";

// import dotenv from 'dotenv';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
    withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalRequest = error.config
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if(error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const response = await instance.post('/api/v1/refresh-token')
            console.log(response)
        } catch (error) {
            // handle refresh token error or redirect to login
        }
    }

    if (error.response) {
        return error.response.data
    }
    return error;
});

export default instance