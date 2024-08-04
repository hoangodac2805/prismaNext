import { UsersApi } from "@/services/api";
import { USER_ENDPOINT } from "@/services/endpoint";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useQueryUsers = ({
  page = 1,
  take = 10,
  search = "",
  role,
  isActive,
}: QueryUsersInput) => {
  const userInput = { page, take, search, role, isActive };
  return useQuery({
    queryKey: [USER_ENDPOINT.BASE, page, take, search, role, isActive],
    queryFn: () => UsersApi.GetUsers(userInput),
    placeholderData: keepPreviousData,
  });
};


export const useQueryUserParam = (id:string|number) => useQuery({
  queryKey: [USER_ENDPOINT.BASE,id],
  queryFn:()=>UsersApi.GetUserByParam(id)
})