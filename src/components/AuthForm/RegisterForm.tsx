"use client";
import React from "react";
import { Button, Form, FormProps, Input, notification } from "antd";
import { Pattern } from "@/libs/partern";
import withTheme from "@/theme";
import styles from "./_authForm.module.scss";
import { AuthApi } from "@/services/api";
import axios from "axios";
import { getErrorMessageAxiosError, handleApiError } from "@/utils";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/config/router";
import useLoadingScreen from "@/hooks/useLoadingScreen";
import { passwordMessage, registerMessage } from "@/config/message";
type FieldType = RegisterUserInput & {
  password2?: string;
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
          message: registerMessage.success,
        });
        router.push(ROUTER.LOGIN);
      })
      .catch((error) => {
        handleApiError({error,messageError:registerMessage.fail})
      })
      .finally(() => {
        setLoadingOff();
      });
  };
  return withTheme(
    <div className={styles.wrapper}>
      <Form
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
          label="User Name"
          name="userName"
          rules={[{ required: true }]}
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
          rules={[{ required: true }, { min: 8 }]}
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
                return Promise.reject(new Error(passwordMessage.notMatch));
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
