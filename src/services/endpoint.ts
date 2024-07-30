const AuthRouter = "authentication/";
const AdminUserRouter = "admin/users/";
export const AUTHEN_ENDPOINT = {
  LOGIN: AuthRouter + "login",
  REGISTER: AuthRouter + "register",
  VERIFY_TOKEN : AuthRouter + "verifyToken"
};

export const USER_ENDPOINT = {
  CREATE: AdminUserRouter + "create",
  GET_USERS : AdminUserRouter + "getMany",
  UPDATE_EMAIL : AdminUserRouter + "updateEmail"
};
