// src/pages/auth/SignIn.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { loginSuccess } from "../../redux/authSlice";
import { Form, Input, Button, Card, Typography, Alert } from "antd";

const { Title, Text } = Typography;

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setError("");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.roles?.[0] || "ROLE_USER";
      localStorage.setItem("userType", role);
      localStorage.setItem("userEmail", decoded.sub);
      dispatch(loginSuccess({ token, user: decoded }));
      // Redirect
      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userEmail");
      setError(err.response?.data?.message || "Authentication failed.");
    }
  };

  return (
    <div style={{
      backgroundColor: '#f4f6f9',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card style={{ width: 400 }} bordered={false}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Sign In</Title>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: '#001e39',
                borderColor: '#001e39'
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Text>Don't have an account? <Link to="signIn">Contact the Admin</Link></Text>
        </div>
      </Card>
    </div>
  );
}
