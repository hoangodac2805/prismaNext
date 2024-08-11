"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, notification, Popconfirm, Row, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import { useQueryUsers } from "@/hooks/Query/users";
import { debounce, handleApiError } from "@/utils";
import Link from "next/link";
import { EditFilled, UserAddOutlined, UserOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { ROUTER } from "@/config/router";
import useDefaultDrawer from "@/hooks/Drawer/useDefaultDrawer";
import { useRouter, useSearchParams } from "next/navigation";
import useAddUserDrawer from "@/hooks/Drawer/useAddUserDrawer";
import { useQueryString } from "@/hooks/useQueryString";
import ProfileDrawerBody from "@/components/SubUserComponent/ProfileDrawerBody";
import { useDeleteUser } from "@/hooks/Mutation/users";
import { deleteMessage } from "@/config/message";

type ColumnsType<T> = TableProps<T>["columns"];

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
}

const Home = () => {
  const route = useRouter();
  const params = useSearchParams();
  const { generate } = useQueryString();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: Number(params.get("paged")?.trim()) || 1
    }
  });
  const {
    openDrawer,
    setContent,
    setTitle,
    setBtnPrimaryLabel,
    setBtnPrimaryFnc,
  } = useDefaultDrawer();
  const addUserDrawer = useAddUserDrawer();
  const deleteUserMutation = useDeleteUser();

  const { data, isFetching } = useQueryUsers({
    page: Number(params.get("paged")?.trim()) || 1,
    take: tableParams.pagination?.pageSize,
    search: params.get("search")?.trim() || "",
  });

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    generate({ paged: pagination.current })
    setTableParams({
      pagination,
    });
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      generate({ search: value, paged: 1 })
    }, 300),
    []
  );

  const handleOpenProfile = (user: CommonUserRes) => {
    setTitle(user.userName);
    setContent(<ProfileDrawerBody user={user} />);
    setBtnPrimaryLabel(
      <Tooltip title="Chỉnh sửa">
        <EditFilled />
      </Tooltip>
    );
    setBtnPrimaryFnc(() => {
      route.push(ROUTER.USERS_DETAIL + user.id);
    });
    openDrawer();
  };

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        notification.success({ message: deleteMessage.success("user") });
      },
      onError: (error) => {
        handleApiError({error,messageError:deleteMessage.fail("user")})
      }
    })
  }

  const columns: ColumnsType<CommonUserRes> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        return (
          <Flex justify="flex-start" gap="10px">
            <Tooltip title="Xem">
              <Button
                onClick={() => {
                  handleOpenProfile(record);
                }}
              >
                <UserOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Sửa đổi">
              <Button>
                <Link href={ROUTER.USERS_DETAIL + record.id}>
                  <EditFilled />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm title="Xóa user?" description="Bạn có muốn xóa user này" okText="Xóa" cancelText="Hủy" onConfirm={() => {
                handleDeleteUser(record.id)
              }}>
                <Button danger >
                  <UserDeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
          </Flex>
        );
      },
    },
  ];


  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: data?.data.paginate.page,
        total: data?.data.paginate.totalRecord,
      },
    });
  }, [data]);

  return (
    <main>
      <Row>
        <Col span={24}>
          <Title style={{ textAlign: "center", color: "#377DFF" }} level={1}>
            Danh sách người dùng
          </Title>
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Form.Item label="Tìm kiếm" initialValue={params.get("search")?.trim() || ""}>
              <Input
                defaultValue={params.get("search")?.trim() || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  debouncedSearch(e.target.value);
                }}
              />
            </Form.Item>
            <Tooltip title="Thêm người dùng">
              <Button
                onClick={() => {
                  addUserDrawer.openDrawer();
                }}
              >
                <UserAddOutlined />
              </Button>
            </Tooltip>
          </Flex>
        </Col>
        <Col span={24}>
          <Table
            scroll={data?.data.users.length ? { x: 1000 } : undefined}
            tableLayout="auto"
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data?.data.users}
            pagination={tableParams.pagination}
            loading={isFetching}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
    </main>
  );
};

export default Home;

