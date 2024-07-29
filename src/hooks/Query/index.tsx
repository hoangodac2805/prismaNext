import { UsersApi } from "@/services/api";
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
    queryKey: ["users", page, take, search, role, isActive],
    queryFn: () => UsersApi.GetUsers(userInput),
    placeholderData: keepPreviousData,
  });
};
