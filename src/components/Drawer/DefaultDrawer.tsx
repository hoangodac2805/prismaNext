'use client'
import useDefaultDrawer from '@/hooks/Drawer/useDefaultDrawer'
import withTheme from '@/theme'
import { Button, Drawer, Space } from 'antd'
import React from 'react'

interface Props {
    children?: React.ReactNode
}

const DefaultDrawer: React.FC<Props> = ({ children }) => {
    const { isOpen, width, closeModal, position, content, title, isLoading } = useDefaultDrawer()
    return withTheme(
        <Drawer
            title={title}
            placement={position}
            width={width}
            onClose={closeModal}
            open={isOpen}
            loading={isLoading}
            extra={
                <Space>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type="primary" onClick={closeModal}>
                        OK
                    </Button>
                </Space>
            }
        >
            {<p>...a</p>}
            {content}
            {children}
        </Drawer>
    )
}

export default DefaultDrawer