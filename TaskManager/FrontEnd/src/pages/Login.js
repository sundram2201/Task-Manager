import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LoginApi } from "../utils/Apis";

const onFinishFailed = (errorInfo) => {
  const errorFields = errorInfo?.errorFields || [];
  const errorNames = errorFields.map((field) => field?.name[0]);
  toast.error(errorNames.join(" or ") + " is Invalid");
};

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email);

    if (!isValidEmail) {
      onFinishFailed({
        errorFields: [{ name: ["Email"] }],
      });
      return;
    }

    try {
      const res = await LoginApi(values);

      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("role", res?.data?.data?.role);
        navigate("/tasks");
      }
    } catch (err) {
      localStorage.clear();
      toast.error(err?.response?.data?.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
