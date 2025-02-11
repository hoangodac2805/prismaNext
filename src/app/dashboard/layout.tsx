"use client";
import React from "react";
import { Flex, Layout, Menu, theme } from "antd";
import withTheme from "@/theme";
import { MenuData } from "@/data/menu";
import { useRouter } from "next/navigation";
import SiderUser from "@/components/SiderUser";
const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  return withTheme(
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Flex vertical justify="space-between" style={{ height: "100%", paddingBottom: 20 }}>
          <Menu
            onClick={(info) => {
              router.push(info.key);
            }}
            theme="dark"
            mode="inline"
            items={MenuData}
          />
          <SiderUser />
        </Flex>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
