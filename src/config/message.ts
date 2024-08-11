export const registerMessage = {
  success: "Đăng ký thành công!",
  fail: "Đăng ký không thành công!",
};

export const loginMessage = {
  success: "Đăng nhập thành công!",
  unauthorize: "Không đủ quyền truy cập!",
  fail: "Đăng nhập không thành công!",
};

export const addUserMessage = {
  success: "Thêm user thành công!",
  fail: "Thêm user không thành công!",
};

export const passwordMessage = {
  notMatch: "Password không trùng nhau!",
};

export const deleteMessage = {
  success: (value?: string) =>
    value ? `Xóa ${value} thành công` : `Xóa thành công!`,
  fail: (value?: string) =>
    value ? `Xóa ${value} không thành công` : `Xóa không thành công!`,
};

export const updateMessage = {
  success: (value?: string) =>
    value ? `Cập nhật ${value} thành công` : `Cập nhật thành công!`,
  fail: (value?: string) =>
    value ? `Cập nhật ${value} không thành công` : `Cập nhật không thành công!`,
};
