import { useUpdateEmail } from "@/hooks/Mutation/users";
import useLoadingScreen from "@/hooks/useLoadingScreen";
import { Pattern } from "@/libs/partern";
import { Col, Form, FormProps, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface Props {
  user: CommonUserRes | null;
  count: number;
}
const Edit_UserForm: React.FC<Props> = ({ user, count }) => {
  const updateEmailMutation = useUpdateEmail();
  // const [form] = Form.useForm();
  if (!user) return null;
  return (
    <>
      <Title level={4} style={{ textAlign: "center" }}>
        Add User
      </Title>
      <Form
        layout="vertical"
        onFieldsChange={(_) => {
          console.log(`_`, _);
          updateEmailMutation.mutate({
            id: user.id,
            email: _[0].value,
          });
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
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
              // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
              //   let validate = form.getFieldError("email");
              //   if (!validate.length) {
              //     updateEmailMutation.mutate({
              //       id: user.id,
              //       email: e.target.value,
              //     });
              //   }
              // }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EditUserInput>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu ít nhất 8 ký tự" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EditUserInput>
              label="User name"
              name="userName"
              rules={[{ required: true, message: "Vui lòng nhập username!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EditUserInput> label="Last name" name="lastName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<EditUserInput> label="First name" name="firstName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <input type="text" />
      {count}
    </>
  );
};

export default Edit_UserForm;
