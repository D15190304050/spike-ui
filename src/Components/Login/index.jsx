import { Card, Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosWithInterceptor from "../../axios/axios";
import "./index.scss"

const isLogin = async (usernamePasswordToken) =>
{
    // Skip axios calling, we just return the data here.
    // "async" and "await" is used to wait for value.
    // let {data} = await axios.get("")
    let data = {name: "sysAntd", password: "123"}
    let loginState = {name: "", content: "", type: ""}
    console.log(data)

    // 1. If username and password exists.
    // 2. Validate password.
    // Login success.

    if (usernamePasswordToken.hasOwnProperty("username") && usernamePasswordToken.hasOwnProperty("password"))
    {
        loginState.name = usernamePasswordToken.name;
        loginState.content = "Login success."
        loginState.type = "success"
    }
    else
    {
        loginState.name = "";
        loginState.content = "Error: ...";
        loginState.type = "error";
    }

    return loginState;
}

function Login() {
    const [messageApi, contextHolder] = message.useMessage();

    // Hooks can only be called inside a function.
    let navigate = useNavigate();

    const onFinish = async (loginInfo) => {
        console.log('Success:', loginInfo);
        // let {type, content} = await isLogin(values)

        axiosWithInterceptor.post("/api/login", loginInfo, {headers: {"Content-Type": "application/json"}})
        .then(
            response =>
            {
                let result = response.data;

                if (result.success)
                {
                    // Save JWT token once login success.
                    let token = result.data;
                    console.log("token =", token)
                    window.sessionStorage.setItem("token", token);

                    // Navigate to home page.
                    // navigate("/pages/")
                }
            }
        )

        // console.log("content = ", content)

        // messageApi.open({type, content}).then(() =>
        // {
        //     if (type === "success")
        //         navigate("/page/main");
        //     else if (type === "error")
        //     {
        //         // Jump to error page.
        //     }
        // })
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="wrap-container">
            {contextHolder}
            <div className="white-background">
                <img src="/src/assets/Eagle.webp" className="image-background"/>
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
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Login;