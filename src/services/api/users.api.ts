import { baseApi } from "./base.api";
import { USER_ENDPOINT } from "../endpoint";

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

const GetUserByParam = (id: GetUserByParamInput) => {
  return baseApi.get<QueryUserRes>(USER_ENDPOINT.GET_USER_PARAM(id));
};

const createUser = (userInput: CreateUserInput) => {
  return baseApi.post<QueryUserRes>(USER_ENDPOINT.CREATE, userInput);
};
const deleteUser = (id: DeleteUserInput) => {
  return baseApi.delete<QueryUserRes>(USER_ENDPOINT.DELETE, {
    params: {
      id,
    },
  });
};

const deleteUsedAvatar = (userInput: DeleteUsedAvatarInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.DELETE_USED_AVATAR, userInput);
}
const UpdateEmail = (userInput: UpdateEmailInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_EMAIL, userInput);
};
const updateUserName = (userInput: UpdateUserNameInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_USERNAME, userInput);
};
const updateFirstName = (userInput: UpdateFirstNameInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_FIRSTNAME, userInput);
};
const updateLastName = (userInput: UpdateLastNameInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_LATNAME, userInput);
};

const updateAvatar = (form: UpdateAvatarInput) => {
  return baseApi.put<QueryUserRes>(USER_ENDPOINT.UPDATE_AVATAR, form);
};

const updateAvatarByUsed = (userInput: UpdateAvatarByUsedInput) => {
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
  deleteUsedAvatar
};

export default UsersApi;
