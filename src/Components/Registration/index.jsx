import { Button } from 'antd'

function Registration()
{
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
                            title="XXX System"
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
    );
}

export default Registration;