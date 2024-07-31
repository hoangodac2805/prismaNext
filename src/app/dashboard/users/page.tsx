"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { Button, Col, Divider, Flex, Form, Input, Row, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import { useQueryUsers } from "@/hooks/Query";
import { debounce } from "@/utils";
import Link from "next/link";
import { EditFilled, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTER } from "@/config/router";
import Paragraph from "antd/es/typography/Paragraph";
import useDefaultDrawer from "@/hooks/Drawer/useDefaultDrawer";
import { useRouter, useSearchParams } from "next/navigation";
import useAddUserDrawer from "@/hooks/Drawer/useAddUserDrawer";

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
  const [search, setSearch] = useState("");
  const route = useRouter();
  const searchParams = useSearchParams();


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const {
    openDrawer,
    setContent,
    setTitle,
    setBtnPrimaryLabel,
    setBtnPrimaryFnc,
  } = useDefaultDrawer();
  const addUserDrawer = useAddUserDrawer();
  const { data, isFetching } = useQueryUsers({
    page: tableParams.pagination?.current,
    take: tableParams.pagination?.pageSize,
    search: search,
  });

  const handleTableChange: TableProps["onChange"] = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const handleOpenProfile = (user: CommonUserRes) => {
    setTitle(user.userName);
    setContent(<DrawerBody user={user} />);
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
        total: data?.data.paginate.totalRecord,
      },
    });
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, data]);


  useEffect(()=>{
    searchParams.set
  })
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
            <Form.Item label="Tìm kiếm">
              <Input
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

const DrawerBody: React.FC<{ user: CommonUserRes }> = ({ user }) => {
  return (
    <>
      <Title level={4} style={{ color: "#377DFF", textAlign: "center" }}>
        Thông tin user
      </Title>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Divider orientation="left" plain>
            ID
          </Divider>
          <Paragraph copyable={{ text: String(user.id) }}>{user.id}</Paragraph>
        </Col>
        <Col span={12}>
          <Divider orientation="left" plain>
            Email
          </Divider>
          <Paragraph copyable={{ text: user.email }}>{user.email}</Paragraph>
        </Col>
        <Col span={12}>
          <Divider orientation="left" plain>
            FirstName
          </Divider>
          <Paragraph copyable={{ text: user.firstName }}>
            {user.firstName}
          </Paragraph>
        </Col>
        <Col span={12}>
          <Divider dashed orientation="left" plain>
            LastName
          </Divider>
          <Paragraph copyable={{ text: user.lastName }}>
            {user.lastName}
          </Paragraph>
        </Col>
        <Col span={24}>
          <Divider dashed orientation="left" plain>
            Avatar
          </Divider>
          <figure>
            <img src={user.avatar?.url || ""}/>
          </figure>
        </Col>
      </Row>
    </>
  );
};
