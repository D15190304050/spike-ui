import { useState } from 'react'
// import { loadEnv } from 'vite';
import axiosWithInterceptor from './axios/axios'
import axios from 'axios'
import { Button } from 'antd';
import AuthKeys from "./Components/constants/AuthKeys.js";
const env = import.meta.env;

const remoteCall = () =>
{
    // Test for calling local server.
    // axiosWithInterceptor.get("/api/quick/hello").then(
    //     response =>
    //     {
    //         console.log("hello response = ", response)
    //     }
    // )

    // Test for token.
    axiosWithInterceptor.post("/api/spike/login",
        {age: 18, name: "Chris"},
        {headers: {"Content-Type": "application/json"}})
        .then(
        response =>
        {
            let token = response.data.token;
            console.log("token = ", token);
            window.sessionStorage.setItem(AuthKeys.Token, token)
        }
    )
}

function App() {
    

    // console.log("env = ", env)
    // console.log("base_url: ", env.VITE_API_URL);
    // console.log("base_url: ", loadEnv("dev", "../env").VITE_API_URL);

    return (
        <div className="App">
            <Button type="primary" onClick={remoteCall}>Call remote</Button>
        </div>
    )
}

export default App
