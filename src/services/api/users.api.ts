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
const createUser = (userInput:FormData) =>{
  return baseApi.post<QueryUsersRes>(USER_ENDPOINT.CREATE,userInput)
}
const UpdateEmail = (userInput: {id:number, email: string }) => {
  return baseApi.put<CommonUserRes>(USER_ENDPOINT.UPDATE_EMAIL,userInput);
};
const UsersApi = {
  GetUsers,
  UpdateEmail,
  createUser
};

export default UsersApi;
