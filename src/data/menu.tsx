import type { MenuProps } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { ROUTER } from "@/config/router";

export const MenuData: MenuProps["items"] = [
  {
    label: "User",
    key: "user",
    icon: <UserOutlined />,
    children: [
      {
        label: "List users",
        key: ROUTER.USERS,
        icon: <UserOutlined />,
      },
      {
        label: "Add user",
        key: ROUTER.USERS_ADD,
        icon: <UserAddOutlined />,
      },
    ],
  },
];
