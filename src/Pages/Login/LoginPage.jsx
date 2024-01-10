import React from 'react';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    }

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Title level={2}>Login</Title>
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    margin: '0 auto',
                    maxWidth: 600,
                    width: '100%'
                }}
                initialValues={{
                    remember: true,
                }}
                labelAlign='left'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Invalid email!',
                        },
                        {
                            required: true,
                            message: 'Please input your email!',
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
                    wrapperCol={{
                        offset: 4,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default LoginPage;