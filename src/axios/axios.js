import axios from "axios";

const axiosWithInterceptor = axios.create({
    timeout: 3000,
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
        let token = window.sessionStorage.getItem("token");
        if (token)
        {
            config.headers["Authorization"] = token;
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

        console.log("responseStatus = ", responseStatus)

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