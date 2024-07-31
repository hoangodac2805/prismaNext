'use client'
import withTheme from '@/theme'
import { Button, Drawer, Space } from 'antd'
import React, { useState } from 'react'
import useAddUserDrawer from '@/hooks/Drawer/useAddUserDrawer'
import Add_UserForm from '../BodyForm/Add_UserForm'
interface Props {
}

const AddUserDrawer: React.FC<Props> = () => {
    const { isOpen, closeDrawer, openDrawer } = useAddUserDrawer();
    const [isLoading, setLoading] = useState(false);
    return withTheme(
        withTheme(<Drawer
            title={"Thêm user mới"}
            placement={"right"}
            width={500}
            onClose={closeDrawer}
            open={isOpen}
            loading={isLoading}
            extra={
                <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                </Space>
            }
        >
            <Add_UserForm />
        </Drawer>)
    )
}

export default AddUserDrawer