import {
  useUpdateEmail,
  useUpdateFirstName,
  useUpdateLastName,
  useUpdateUserName,
} from "@/hooks/Mutation/users";
import { Pattern } from "@/libs/partern";
import { getErrorMessageAxiosError } from "@/utils";
import { MutateOptions } from "@tanstack/react-query";
import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  notification,
  Row,
} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useCallback, useState } from "react";

interface Props {
  user: CommonUserRes | null;
}
type EditingField = {
  [K in keyof Omit<EditUserInput, "avatar" | "avatarId">]: boolean;
};

const handleUpdate = <T, A extends any[]>(
  key: keyof T,
  form: FormInstance<any>,
  Fn: (...args: A) => void,
  ...args: A
) => {
  let validate = form.getFieldError(key);
  if (!validate.length) {
    if (!validate.length) {
      Fn(...args);
    }
  }
};

const Edit_UserForm: React.FC<Props> = ({ user }) => {
  const [isEditing, setIsEditing] = useState<EditingField>({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    userName: false,
  });
  const updateEmailMutation = useUpdateEmail();
  const updateUserNameMutation = useUpdateUserName();
  const updateFirstNameMutation = useUpdateFirstName();
  const updateLastNameMutation = useUpdateLastName();
  const handleSetEditOn = (key: keyof EditingField) => {
    setIsEditing({
      ...isEditing,
      [key]: true,
    });
  };
  const handleSetEditOff = (key: keyof EditingField) => {
    setIsEditing({
      ...isEditing,
      [key]: false,
    });
  };
  const [form] = Form.useForm();

  const defaultOptions = useCallback(
    (key: keyof EditingField): MutateOptions<any, any, any, unknown> => {
      return {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            notification.error({
              message: `Cập nhật ${key} không thành công`,
              description: getErrorMessageAxiosError(error),
            });
          } else {
            notification.error({
              message: `Cập nhật ${key} không thành công`,
            });
          }
        },
        onSuccess: () => {
          notification.success({
            message: `Cập nhật  ${key} thành công`,
          });
          handleSetEditOff(key);
        },
      };
    },
    []
  );
  const handleButtonEdit = (key: keyof EditingField) => {
    if (isEditing[key]) {
      handleSetEditOff(key);
    } else {
      handleSetEditOn(key);
    }
  };
  if (!user) return null;
  return (
    <>
      <Title level={4} style={{ textAlign: "center" }}>
        Edit
      </Title>
      <Form form={form} layout="vertical" autoFocus>
        <Row gutter={16}>
          <Col span={8}>
            <Flex gap={"10px 10px"} align="flex-end">
              <Form.Item<EditUserInput>
                label="Email"
                name="email"
                initialValue={user.email}
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  {
                    pattern: Pattern.Email,
                    message: "Vui lòng nhập đúng định dạng email!",
                  },
                ]}
              >
                <Input
                  disabled={!isEditing.email}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    handleUpdate(
                      "email",
                      form,
                      updateEmailMutation.mutate,
                      {
                        id: user.id,
                        email: e.target.value,
                      },
                      defaultOptions("email")
                    );
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  handleButtonEdit("email");
                }}
                htmlType="button"
                style={{ marginBottom: 24 }}
              >
                {isEditing.email ? "Finish" : "Edit"}
              </Button>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex gap={"10px 10px"} align="flex-end">
              <Form.Item<EditUserInput>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 8, message: "Mật khẩu ít nhất 8 ký tự" },
                ]}
              >
                <Input disabled={!isEditing.password} />
              </Form.Item>
              <Button
                onClick={() => {
                  handleButtonEdit("password");
                }}
                htmlType="button"
                style={{ marginBottom: 24 }}
              >
                {isEditing.password ? "Finish" : "Edit"}
              </Button>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex gap={"10px 10px"} align="flex-end">
              <Form.Item<EditUserInput>
                initialValue={user.userName}
                label="User name"
                name="userName"
                rules={[{ required: true, message: "Vui lòng nhập username!" }]}
              >
                <Input
                  disabled={!isEditing.userName}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    handleUpdate(
                      "userName",
                      form,
                      updateUserNameMutation.mutate,
                      {
                        id: user.id,
                        userName: e.target.value,
                      },
                      defaultOptions("userName")
                    );
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  handleButtonEdit("userName");
                }}
                htmlType="button"
                style={{ marginBottom: 24 }}
              >
                {isEditing.userName ? "Finish" : "Edit"}
              </Button>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex gap={"10px 10px"} align="flex-end">
              <Form.Item<EditUserInput>
                initialValue={user.firstName}
                label="First name"
                name="firstName"
              >
                <Input
                  disabled={!isEditing.firstName}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    handleUpdate(
                      "firstName",
                      form,
                      updateFirstNameMutation.mutate,
                      {
                        id: user.id,
                        firstName: e.target.value,
                      },
                      defaultOptions("firstName")
                    );
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  handleButtonEdit("firstName");
                }}
                htmlType="button"
                style={{ marginBottom: 24 }}
              >
                {isEditing.firstName ? "Finish" : "Edit"}
              </Button>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex gap={"10px 10px"} align="flex-end">
              <Form.Item<EditUserInput>
                initialValue={user.lastName}
                label="Last name"
                name="lastName"
              >
                <Input disabled={!isEditing.lastName} 
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    handleUpdate(
                      "lastName",
                      form,
                      updateLastNameMutation.mutate,
                      {
                        id: user.id,
                        lastName: e.target.value,
                      },
                      defaultOptions("lastName")
                    );
                  }}
                />
              </Form.Item>
              <Button
                onClick={() => {
                  handleButtonEdit("lastName");
                }}
                htmlType="button"
                style={{ marginBottom: 24 }}
              >
                {isEditing.lastName ? "Finish" : "Edit"}
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Edit_UserForm;
