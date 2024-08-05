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
  GetProp,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { Pattern } from "@/libs/partern";
import axios from "axios";
import { getErrorMessageAxiosError } from "@/utils";
import { useCreateUser } from "@/hooks/Mutation/users";
interface Props {
  onFormLoading: (value: boolean) => void;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const Add_UserForm: React.FC<Props> = ({ onFormLoading }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const createUserMutation = useCreateUser();
  const handleSubmit: FormProps<AddUserInput>["onFinish"] = (values) => {
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
        notification.success({ message: "Thêm user thành công" });
        form.resetFields();
        setFileList([]);
        onFormLoading(false);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          notification.error({
            message: "Thêm user không thành công!",
            description: getErrorMessageAxiosError(error),
          });
        } else {
          notification.error({ message: "Thêm user không thành công!" });
        }
        onFormLoading(false);
      },
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Form.Item<AddUserInput>
            label="Email"
            name={"email"}
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
        </Col>
        <Col span={12}>
          <Form.Item<AddUserInput>
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
        <Col span={12}>
          <Form.Item<AddUserInput>
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<AddUserInput> label="First Name" name={"firstName"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<AddUserInput> label="Last Name" name={"lastName"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<AddUserInput> label="Avatar" name={"avatar"}>
            <ImgCrop rotationSlider aspect={1 / 1} showReset>
              <Upload
                name="avatar"
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                onChange={onChange}
                // onPreview={onPreview}
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
  );
};

export default Add_UserForm;
