import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  FormProps,
  notification,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { Pattern } from "@/libs/partern";
import axios from "axios";
import { getErrorMessageAxiosError, handleApiError } from "@/utils";
import { useCreateUser } from "@/hooks/Mutation/users";
import withTheme from "@/theme";
import { addUserMessage } from "@/config/message";
interface Props {
  onFormLoading: (value: boolean) => void;
}
const Add_UserForm: React.FC<Props> = ({ onFormLoading }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const createUserMutation = useCreateUser();
  const handleSubmit: FormProps<AddUserField>["onFinish"] = (values) => {

    onFormLoading(true);

    let formData = new FormData();
    
    Object.entries(values).forEach((item) => {
      const [key, value] = item;
      if (typeof value === "string") {
        formData.append(key, value);
      } else {
        if (value && value?.fileList.length > 0) {
          const { originFileObj } = value.fileList[0];
          if (originFileObj) {
            formData.append(key, originFileObj, originFileObj.name);
          }
        }
      }
    });
    if (fileList.length > 0) {
      const { originFileObj } = fileList[0];
      if (originFileObj) {
        formData.append("avatar", originFileObj, originFileObj.name);
      }
    }
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        notification.success({ message: addUserMessage.success });
        form.resetFields();
        setFileList([]);
        onFormLoading(false);
      },
      onError: (error) => {
        handleApiError({error,messageError:addUserMessage.fail})
        onFormLoading(false);
      },
    });
  };

  return (

    withTheme(
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item<AddUserField>
              label="Email"
              name={"email"}
              rules={[
                { required: true },
                {
                  pattern: Pattern.Email,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<AddUserField>
              label="Password"
              name="password"
              rules={[
                { required: true },
                { min: 8 },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<AddUserField>
              label="User Name"
              name="userName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<AddUserField> label="First Name" name={"firstName"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<AddUserField> label="Last Name" name={"lastName"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<AddUserField> label="Avatar" name={"avatar"}>
              <ImgCrop rotationSlider aspect={1 / 1} showReset>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  maxCount={1}
                  accept="image/*"
                  onChange={onChange}
                >
                  <Button icon={<UploadOutlined />}></Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button htmlType="submit">Submit</Button>
            <Button htmlType="reset" danger style={{ marginLeft: "20px" }}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    )
  );
};

export default Add_UserForm;
