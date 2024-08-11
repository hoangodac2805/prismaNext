"use client";
import React from "react";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { Pattern } from "@/libs/partern";
import { useAuth } from "@/contexts/AuthContext";
import withTheme from "@/theme";
import styles from "./_authForm.module.scss";
type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm = () => {
  const { login } = useAuth();
  const handleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
    login({ email: values.email, password: values.password }, values.remember);
  };
  return withTheme(
    <div className={styles.wrapper}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        className={styles.form}
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true },
            {
              pattern: Pattern.Email,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true }, { min: 8 }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 12 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
