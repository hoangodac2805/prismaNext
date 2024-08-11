import {
  useDeleteUsedAvatar,
  useUpdateAvatar,
  useUpdateAvatarByUsed,
  useUpdateEmail,
  useUpdateFirstName,
  useUpdateLastName,
  useUpdateUserName,
} from "@/hooks/Mutation/users";
import {
  UploadOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Pattern } from "@/libs/partern";
import { handleApiError } from "@/utils";
import { MutateOptions } from "@tanstack/react-query";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  FormInstance,
  Image,
  Input,
  notification,
  Popconfirm,
  Row,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useCallback, useState } from "react";
import withTheme from "@/theme";
import { deleteMessage, updateMessage } from "@/config/message";

interface Props {
  user: CommonUserRes | null;
}
type EditingField = {
  [K in keyof Omit<EditUserField, "avatarId">]: boolean;
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

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateEmailMutation = useUpdateEmail();
  const updateUserNameMutation = useUpdateUserName();
  const updateFirstNameMutation = useUpdateFirstName();
  const updateLastNameMutation = useUpdateLastName();
  const updateAvatarMutation = useUpdateAvatar();
  const updateAvatarByUsedMutation = useUpdateAvatarByUsed();
  const deleteUsedAvatarMutation = useDeleteUsedAvatar();

  const [form] = Form.useForm();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
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

  const handleButtonEdit = (key: keyof EditingField) => {
    if (isEditing[key]) {
      handleSetEditOff(key);
    } else {
      handleSetEditOn(key);
    }
  };

  const handleUpdateAvatar = () => {
    if (fileList.length > 0) {
      let formData = new FormData();
      formData.append("id", String(user?.id));
      let { originFileObj } = fileList[0];
      if (originFileObj) {
        formData.append("avatar", originFileObj, originFileObj.name);
      }
      updateAvatarMutation.mutate(formData, {
        onError: (error) => {
          handleApiError({ error, messageError: updateMessage.fail("avatar") });
        },
        onSuccess: () => {
          notification.success({
            message: updateMessage.success("avatar"),
          });
          form.resetFields();
          setFileList([]);
        },
      });
    }
  };

  const handleUpdateAvatarByUsed = (userInput: UpdateAvatarByUsedInput) => {
    updateAvatarByUsedMutation.mutate(userInput, {
      onError: (error) => {
        handleApiError({ error, messageError: updateMessage.fail("avatar") });
      },
      onSuccess: () => {
        notification.success({
          message: updateMessage.success("avatar"),
        });
      },
    });
  };

  const handleDeleteUsedAvatar = (userInput: DeleteUsedAvatarInput) => {
    deleteUsedAvatarMutation.mutate(userInput, {
      onError: (error) => {
        handleApiError({ error, messageError: deleteMessage.fail("avatar") });
      },
      onSuccess: () => {
        notification.success({
          message: deleteMessage.success("avatar"),
        });
      },
    });
  };

  const defaultOptions = useCallback(
    (key: keyof EditingField): MutateOptions<any, any, any, unknown> => {
      return {
        onError: (error) => {
          handleApiError({ error, messageError: updateMessage.fail(key) });
        },
        onSuccess: () => {
          notification.success({
            message: updateMessage.success(key),
          });
          handleSetEditOff(key);
        },
      };
    },
    []
  );

  if (!user) return null;
  return withTheme(
    <>
      <Title level={4} style={{ textAlign: "center" }}>
        Edit
      </Title>
      <Form form={form} layout="vertical" autoFocus>
        <Row gutter={16}>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Flex gap={"10px 10px"} align="flex-end">
                  <Form.Item<EditUserField>
                    label="Email"
                    name="email"
                    initialValue={user.email}
                    rules={[
                      { required: true },
                      {
                        pattern: Pattern.Email,
                      },
                    ]}
                  >
                    <Input
                      disabled={!isEditing.email}
                      onBlur={(
                        e: React.FocusEvent<HTMLInputElement, Element>
                      ) => {
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
              <Col span={12}>
                <Flex gap={"10px 10px"} align="flex-end">
                  <Form.Item<EditUserField>
                    label="Password"
                    name="password"
                    rules={[{ required: true }, { min: 8 }]}
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
              <Col span={12}>
                <Flex gap={"10px 10px"} align="flex-end">
                  <Form.Item<EditUserField>
                    initialValue={user.userName}
                    label="User name"
                    name="userName"
                    rules={[{ required: true }]}
                  >
                    <Input
                      disabled={!isEditing.userName}
                      onBlur={(
                        e: React.FocusEvent<HTMLInputElement, Element>
                      ) => {
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
              <Col span={12}>
                <Flex gap={"10px 10px"} align="flex-end">
                  <Form.Item<EditUserField>
                    initialValue={user.firstName}
                    label="First name"
                    name="firstName"
                  >
                    <Input
                      disabled={!isEditing.firstName}
                      onBlur={(
                        e: React.FocusEvent<HTMLInputElement, Element>
                      ) => {
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
              <Col span={12}>
                <Flex gap={"10px 10px"} align="flex-end">
                  <Form.Item<EditUserField>
                    initialValue={user.lastName}
                    label="Last name"
                    name="lastName"
                  >
                    <Input
                      disabled={!isEditing.lastName}
                      onBlur={(
                        e: React.FocusEvent<HTMLInputElement, Element>
                      ) => {
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
          </Col>
          <Col span={8}>
            <Form.Item<AddUserField> label="Avatar" name={"avatar"}>
              <Flex gap={"10px 10px"}>
                <Image
                  style={{ maxWidth: 200 }}
                  src={user.avatar?.url}
                  fallback="data:image/png;base64,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"
                />
                <Flex
                  gap={"10px 10px"}
                  vertical
                  justify="center"
                  align="center"
                >
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
                  <Button
                    onClick={() => {
                      handleUpdateAvatar();
                    }}
                    type="primary"
                    disabled={!(fileList.length > 0)}
                  >
                    Change Avatar
                  </Button>
                </Flex>
              </Flex>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider orientation="left" plain>
              Album
            </Divider>
            <Flex gap={"30px 10px"} wrap>
              {user.usedAvatars?.map((avatar) => (
                <Flex gap={"10px 10px"} vertical align="center">
                  <Image width={150} src={avatar.url} />
                  <Flex gap={"10px 10px"}>
                    {user.avatar?.uuid === avatar.uuid ? (
                      <Button disabled>Current Avatar</Button>
                    ) : (
                      <>
                        <Tooltip title="Set avatar">
                          <Popconfirm
                            title="Đặt làm avatar"
                            description="Bạn có đặt hình này làm avatar không?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => {
                              handleUpdateAvatarByUsed({
                                id: user.id,
                                avatarUUID: avatar.uuid,
                              });
                            }}
                          >
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<SaveOutlined />}
                            />
                          </Popconfirm>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Popconfirm
                            title="Xoá hình"
                            description="Bạn có muốn xóa hình này không?"
                            okText="Xóa"
                            cancelText="Hủy"
                            onConfirm={() => {
                              handleDeleteUsedAvatar({
                                id: user.id,
                                avatarUUID: avatar.uuid,
                              });
                            }}
                          >
                            <Button
                              danger
                              shape="circle"
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        </Tooltip>
                      </>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Edit_UserForm;
