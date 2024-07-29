'use client'
import React from 'react'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const getItem = (label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem("Team1","sub1",<UserOutlined/>, [getItem("Team1","1")]),
    getItem("Team2","sub2",<UserOutlined/>, [getItem("Team2","2")]),
];

const layout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Layout hasSider>
                <Sider
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                >
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout></>
    )
}

export default layout