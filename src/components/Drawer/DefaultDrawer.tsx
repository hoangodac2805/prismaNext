'use client'
import useDefaultDrawer from '@/hooks/Drawer/useDefaultDrawer'
import withTheme from '@/theme'
import { Button, Drawer, Space } from 'antd'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const DefaultDrawer: React.FC<Props> = ({ children }) => {
    const { isOpen, width, closeDrawer, position, content, title, isLoading, btnPrimaryLabel, btnPrimaryFnc } = useDefaultDrawer()
    return withTheme(
        <Drawer
            title={title}
            placement={position}
            width={width}
            onClose={closeDrawer}
            open={isOpen}
            loading={isLoading}
            extra={
                <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button type="primary" onClick={() => {
                        if (btnPrimaryFnc) {
                            btnPrimaryFnc();
                        }
                        closeDrawer()
                    }}>
                        {btnPrimaryLabel || "OK"}
                    </Button>
                </Space>
            }
        >
            {content}
            {children}
         
        </Drawer>
    )
}

export default DefaultDrawer