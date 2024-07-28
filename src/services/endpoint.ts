const AuthRouter = "authentication/";
const AdminUserRouter = "admin/user/";
export const AUTHEN_ENDPOINT = {
  LOGIN: AuthRouter + "login",
  REGISTER: AuthRouter + "register",
  VERIFY_TOKEN : AuthRouter + "verifyToken"
};

export const USER_ENDPOINT = {
  CREATE: AdminUserRouter + "create",
};
