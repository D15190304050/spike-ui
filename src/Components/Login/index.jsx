import { Card, Button, Checkbox, Form, Input, message, Spin, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosWithInterceptor from "../../axios/axios";
import "./index.scss"

function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    // Hooks can only be called inside a function.
    let navigate = useNavigate();

    const onFinish = async (loginInfo) => {
        console.log('Success:', loginInfo);
        setLoading(true);

        axiosWithInterceptor.post("/api/login", loginInfo, {headers: {"Content-Type": "application/json"}})
        .then(
            response =>
            {
                setLoading(false);
                let result = response.data;

                if (result.success)
                {
                    // Save JWT token once login success.
                    let token = result.data;
                    console.log("token =", token);
                    window.sessionStorage.setItem("token", token);

                    // Navigate to home page.
                    // navigate("/pages/")
                }
            }
        )
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const jumpToRegisterPage = () =>
    {
        console.log("jumpToRegisterPage...")
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