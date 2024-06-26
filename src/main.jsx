import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import {ConfigProvider} from 'antd';
import Login from './Components/Login';
import App from './App'
import Registration from './Components/Registration';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
                {/* <Route path="/page/*" element={<App />} /> */}
            </Routes>
        </BrowserRouter>
    </ConfigProvider>
)
