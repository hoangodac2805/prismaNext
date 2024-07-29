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
const UsersApi = {
  GetUsers,
};

export default UsersApi;
