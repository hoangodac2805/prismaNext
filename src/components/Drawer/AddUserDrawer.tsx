'use client'
import withTheme from '@/theme'
import { Button, Drawer, Flex, Space, Spin } from 'antd'
import React, { useState } from 'react'
import useAddUserDrawer from '@/hooks/Drawer/useAddUserDrawer'
import Add_UserForm from '../BodyForm/Add_UserForm'
interface Props {
}

const AddUserDrawer: React.FC<Props> = () => {
    const { isOpen, closeDrawer } = useAddUserDrawer();
    const [isDisabled, setDisabled] = useState(false);
    return withTheme(
        withTheme(<Drawer
            title={"Thêm user mới"}
            placement={"right"}
            width={500}
            onClose={closeDrawer}
            open={isOpen}
            extra={
                <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                </Space>
            }
        >
            <Add_UserForm onFormLoading={setDisabled} />
            {isDisabled && <Flex justify='center' align='center' style={{ position: "absolute", backgroundColor: "rgba(255,255,255,0.9)", top: 0, left: 0, width: "100%", height: "100%", zIndex: 99 }}>
                <Spin size='small' />
            </Flex>}
        </Drawer>)
    )
}

export default AddUserDrawer