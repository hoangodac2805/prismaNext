import { baseApi } from "./base.api";
import { USER_ENDPOINT } from "../endpoint";
import { UploadFile } from "antd";

const GetUsers = (userInput: QueryUsersInput) => {
  return baseApi.get<QueryUsersRes>(USER_ENDPOINT.GET_USERS, {
    params: {
      page: userInput.page,
      take: userInput.take,
      search: userInput.search,
      role: userInput.role,
      isActive: userInput.isActive,
    },
  });
};

const GetUserByParam = (id: string | number) => {
  return baseApi.get<QueryUserRes>(USER_ENDPOINT.GET_USER_PARAM(id));
};

const createUser = (userInput: FormData) => {
  return baseApi.post<CommonUserRes>(USER_ENDPOINT.CREATE, userInput);
};
const deleteUser = (id: number) => {
  return baseApi.delete<CommonUserRes>(USER_ENDPOINT.DELETE, {
    params: {
      id,
    },
  });
};
const UpdateEmail = (userInput: { id: number; email: string }) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_EMAIL, userInput);
};
const updateUserName = (userInput: { id: number; userName: string }) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_USERNAME, userInput);
};
const updateFirstName = (userInput: { id: number; firstName: string }) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_FIRSTNAME, userInput);
};
const updateLastName = (userInput: { id: number; lastName: string }) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_LATNAME, userInput);
};

const updateAvatar = (form: FormData) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_AVATAR, form);
};

const updateAvatarByUsed = (userInput: {
  id: number;
  avatarId: string | number;
}) => {
  return baseApi.put<QueryUserRes>(
    USER_ENDPOINT.UPDATE_AVATAR_BY_USED,
    userInput
  );
};
const UsersApi = {
  GetUsers,
  UpdateEmail,
  createUser,
  deleteUser,
  GetUserByParam,
  updateUserName,
  updateFirstName,
  updateLastName,
  updateAvatar,
  updateAvatarByUsed,
};

export default UsersApi;
