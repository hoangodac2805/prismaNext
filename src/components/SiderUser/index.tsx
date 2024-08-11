'use client'
import React from 'react'
import styles from "./_SiderUser.module.scss"
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, Button, Flex, Row, Tooltip, } from 'antd'
import { UserOutlined, FolderViewOutlined, LogoutOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title'

const SiderUser = () => {
    const { loginedUser, logout } = useAuth();
    if(!loginedUser) return null;
    return (
        <Flex vertical align='center' className={styles.wrapper} gap={"10px 10px"}>
            {loginedUser?.avatar ?
                <Avatar size={64} src={loginedUser.avatar.url} /> :
                <Avatar style={{ backgroundColor: "#fff", color: "#000" }} size={64} icon={<UserOutlined />} />
            }
            <Title style={{color:"#fff"}} level={5}>{loginedUser?.firstName + " " + loginedUser?.lastName}</Title>
            <Flex gap={"10px 10px"}>
                <Tooltip title="Xem thông tin">
                    <Button shape='circle' icon={<FolderViewOutlined />} />
                </Tooltip>
                <Tooltip title="Đăng xuất">
                    <Button shape='circle' icon={<LogoutOutlined />} onClick={() => {
                        logout()
                    }
                    } />
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default SiderUser