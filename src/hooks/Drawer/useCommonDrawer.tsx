import { Button, Drawer, Space } from "antd";
import React, { useState } from "react";

interface UseDrawer {
  isOpen: boolean;
  openDrawer: () => void;
  CommonDrawer: React.FC<{ children?: React.ReactNode }>;
}

export const useCommonDrawer = (): UseDrawer => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () =>  {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const DrawerConponent: React.FC<{ children?: React.ReactNode }> = ({
    children,
  }) => (
    <Drawer
    maskClosable={false}
      placement={"right"}
      width={"50%"}
      style={{ minWidth: "500px" }}
      onClose={closeDrawer}
      open={isOpen}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Cancel</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );

  return {
    isOpen,
    openDrawer,
    CommonDrawer: DrawerConponent,
  };
};
