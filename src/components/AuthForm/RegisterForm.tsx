"use client";
import React from "react";
import { Button, Form, FormProps, Input, notification } from "antd";
import { Pattern } from "@/libs/partern";
import withTheme from "@/theme";
import styles from "./_authForm.module.scss";
import { AuthApi } from "@/services/api";
import axios from "axios";
import { getErrorMessageAxiosError } from "@/utils";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/config/router";
import useLoadingScreen from "@/hooks/useLoadingScreen";
type FieldType = {
  email: string;
  password: string;
  password2?: string;
  userName: string;
  firstName?: string;
  lastName?: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const { setLoadingOff, setLoadingOn } = useLoadingScreen();
  const handleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
    delete values.password2;
    setLoadingOn();
    AuthApi.Register(values)
      .then((res) => {
        notification.success({
          message: "Đăng ký thành công!",
        });
        router.push(ROUTER.LOGIN);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          notification.error({
            message: "Đăng ký không thành công",
            description: getErrorMessageAxiosError(
              error,
              "Đăng ký không thành công, vui lòng thử lại!"
            ),
          });
          return;
        }
        notification.error({
          message: "Đăng ký không thành công",
        });
      })
      .finally(() => {
        setLoadingOff();
      });
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
            { required: true, message: "Vui lòng nhập email!" },
            {
              pattern: Pattern.Email,
              message: "Vui lòng nhập đúng định dạng email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="User Name"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu ít nhất 8 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password không trùng nhau!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
