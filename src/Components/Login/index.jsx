import { Card, Button, Checkbox, Form, Input, message, Spin, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axiosWithInterceptor from "../../axios/axios";
import "./index.scss"
import AuthKeys from "../constants/AuthKeys.js";

function goToSourcePage(redirectUrl, token)
{
    window.location.href = redirectUrl + "?token=" + token;
}

function Login() {
    const location = useLocation();
    const cookies = new Cookies();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    // Hooks can only be called inside a function.
    let navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get(AuthKeys.RedirectUrl);

    useEffect(() =>
    {
        const ssoCookie = cookies.get(AuthKeys.SsoCookieName);
        if (ssoCookie !== null)
        {
            axiosWithInterceptor.get("/api/spike/account/validate-token").then(response =>
            {
                const tokenValidationResult = response.data;
                console.log("tokenValidationResult = ", tokenValidationResult);

                // Jump to the source page only if the user comes from another page.
                if (redirectUrl !== null && tokenValidationResult.success)
                    goToSourcePage(redirectUrl, tokenValidationResult.data.token);
            });
        }
    }, []);

    const onFinish = async (loginInfo) => {
        loginInfo.redirectUrl = redirectUrl;
        console.log('Success:', loginInfo);
        setLoading(true);

        let loginUrl = "/api/spike/login";

        axiosWithInterceptor.post(loginUrl, loginInfo, {headers: {"Content-Type": "application/json"}})
        .then(
            response =>
            {
                setLoading(false);
                let result = response.data;

                if (result.success)
                {
                    // Save JWT token once login success.
                    let data = result.data;
                    let token = data.token;
                    let redirectUrl = data.redirectUrl;
                    console.log("data =", data);
                    window.sessionStorage.setItem(AuthKeys.Token, token);

                    if (redirectUrl !== null)
                    {
                        console.log("Go redirect.");
                        goToSourcePage(redirectUrl, token);
                    }
                }
            }
        ).catch(error =>
        {
            console.log("Error when logging in: ", error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const jumpToRegisterPage = () =>
    {
        navigate("/register")
    }

    return (
        <div>
            <Spin spinning={loading} size="large" tip="Loading..." delay={500}>
                <div className="wrap-container">
                    {contextHolder}
                    <div className="white-background">
                        <img src="/src/assets/Eagle.webp" className="image-background" />
                    </div>
                    <div className="login-wrap">
                        <Card
                            title="Reshaper"
                            bordered={false}
                            style={{
                                width: 500, // Card width: 500 px.
                            }}
                        >
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Username" // "label" is used for display.
                                    name="username" // "name" is used for http parameters.
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="rememberMe"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox defaultChecked>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Login
                                        </Button>
                                        <Button type="default" htmlType="button" onClick={jumpToRegisterPage}>
                                            Register
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default Login;