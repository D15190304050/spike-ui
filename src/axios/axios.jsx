import axios from "axios";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { message, Spin } from 'antd';
import AuthKeys from "../Components/constants/AuthKeys.js";

let requestCount = 0;


const axiosWithInterceptor = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000 * 60 * 1,
    withCredentials: true,
    headers:
    {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    }
})

axiosWithInterceptor.interceptors.request.use(
    config =>
    {
        let token = window.sessionStorage.getItem(AuthKeys.Token);
        if (token)
        {
            config.headers[AuthKeys.Authorization] = token;
        }

        return config;
    },
    error =>
    {
        return Promise.reject(error);
    }
);

axiosWithInterceptor.interceptors.response.use(
    response =>
    {
        let responseStatus = response.status;

        // console.log("responseStatus = ", responseStatus)

        switch (responseStatus) {
            case 401:
            case 403:
                // Jump to unauthorized page.
                console.log("zzz");
                break;
            case 404:
                break;
            case 200:
                return response;
        }
    },
    error =>
    {
        console.log("error = ", error);
        return Promise.reject(error);
    }
)

export default axiosWithInterceptor;