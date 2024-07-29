"use client";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import qs from "qs";
import { useQueryUsers } from "@/hooks/Query";

type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
const columns: ColumnsType<CommonUserRes> = [
  {
    title: "Id",
    dataIndex: "id",
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: "10%",
  },
  {
    title: "User Name",
    dataIndex: "username",
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const Home = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });
  const { data, isError, isLoading, isFetching } = useQueryUsers({
    page: tableParams.pagination?.current,
    take: tableParams.pagination?.pageSize,
  });
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //           // 200 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  // };

  useEffect(() => {
      setTableParams({
        ...tableParams,
        pagination :{
          ...tableParams.pagination,
          total:data?.data.paginate.totalRecord
        }
      })
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    data
  ]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };
  return (
    <main>
      <Row>
        <Col span={24}>
          <Title style={{ textAlign: "center" }} color="#2F54EB" level={1}>
            All Users
          </Title>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data?.data.users}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
    </main>
  );
};

export default Home;
