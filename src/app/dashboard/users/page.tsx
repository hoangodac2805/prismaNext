"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import { useQueryUsers } from "@/hooks/Query";
import { debounce } from "@/utils";
import Link from "next/link";
import { EditFilled, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTER } from "@/config/router";
import { useCommonDrawer } from "@/hooks/Drawer/useCommonDrawer";
import Edit_UserForm from "@/components/BodyForm/Edit_UserForm";

type ColumnsType<T> = TableProps<T>["columns"];

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
}

const Home = () => {
  const [tableParams, setTableParams] = useState<TableParams>({});
  const [editingUser, setEditingUser] = useState<CommonUserRes | null>(null);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isFetching } = useQueryUsers({
    page: tableParams.pagination?.current,
    take: tableParams.pagination?.pageSize,
    search: search,
  });

  const { openDrawer, CommonDrawer } = useCommonDrawer();

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const renderEditContent: React.ReactNode = useMemo(() => {
    return <Edit_UserForm user={editingUser} count={count} />;
  }, [editingUser]);

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
            <Tooltip title="Sửa đổi">
              <Button>
                <Link href={ROUTER.USERS_ADD}>
                  <EditFilled />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip title="Xem">
              <Button
                onClick={() => {
                  setEditingUser(record);
                  setCount((count) => count+=1);
                  openDrawer();
                }}
              >
                <UserOutlined />
              </Button>
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data?.data.paginate.totalRecord,
      },
    });
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, data]);

  return (
    <main>
      <Row>
        <Col span={24}>
          <Title style={{ textAlign: "center" }} color="#2F54EB" level={1}>
            Danh sách người dùng
          </Title>
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Form.Item label="Tìm kiếm">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  debouncedSearch(e.target.value);
                }}
              />
            </Form.Item>
            <Tooltip title="Thêm người dùng">
              <Button>
                <Link href={ROUTER.USERS_ADD}>
                  <UserAddOutlined />
                </Link>
              </Button>
            </Tooltip>
          </Flex>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data?.data.users}
            pagination={tableParams.pagination}
            loading={isFetching}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
      <CommonDrawer>{renderEditContent}</CommonDrawer>
    </main>
  );
};

export default Home;
