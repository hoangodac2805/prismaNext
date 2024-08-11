const AuthRouter = "authentication/";
const AdminUserRouter = "admin/users/";
export const AUTHEN_ENDPOINT = {
  LOGIN: AuthRouter + "login",
  REGISTER: AuthRouter + "register",
  VERIFY_TOKEN: AuthRouter + "verifyToken",
};

export const USER_ENDPOINT = {
  BASE: AdminUserRouter,
  CREATE: AdminUserRouter + "create",
  DELETE: AdminUserRouter + "delete",
  DELETE_USED_AVATAR: AdminUserRouter + "deleteUsedAvatar",
  GET_USERS: AdminUserRouter + "getMany",
  GET_USER_PARAM: (id: number | string) =>
    AdminUserRouter + "getUserParams/" + id,
  UPDATE_EMAIL: AdminUserRouter + "updateEmail",
  UPDATE_USERNAME: AdminUserRouter + "updateUserName",
  UPDATE_FIRSTNAME: AdminUserRouter + "updateFirstName",
  UPDATE_LATNAME: AdminUserRouter + "updateLastName",
  UPDATE_AVATAR: AdminUserRouter + "updateAvatar",
  UPDATE_AVATAR_BY_USED: AdminUserRouter + "updateAvatarByUsed",
};
