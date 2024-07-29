import type { MenuProps } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { ROUTER } from "@/config/router";

export const MenuData: MenuProps["items"] = [
  {
    label: "Users",
    key: "user",
    icon: <UserOutlined />,
    children: [
      {
        label: "All Users",
        key: ROUTER.USERS,
        icon: <UserOutlined />,
      },
      {
        label: "Add User",
        key: ROUTER.USERS_ADD,
        icon: <UserAddOutlined />,
      },
    ],
  },
];
