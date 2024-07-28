import { notification } from 'antd';

const useNotification = () => {
  const openNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string, description?: string) => {
    notification[type]({
      message,
      description,
    });
  };

  return {
    success: (message: string, description?: string) => openNotification('success', message, description),
    info: (message: string, description?: string) => openNotification('info', message, description),
    warning: (message: string, description?: string) => openNotification('warning', message, description),
    error: (message: string, description?: string) => openNotification('error', message, description),
  };
};

export default useNotification;