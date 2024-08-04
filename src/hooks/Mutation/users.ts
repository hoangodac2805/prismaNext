import { UsersApi } from "@/services/api";
import { USER_ENDPOINT } from "@/services/endpoint";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const DefaultOptions = () => {
  const queryClient = useQueryClient();

  const options: MutationOptions<any, any, any> = {
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: [USER_ENDPOINT.BASE] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_ENDPOINT.BASE] });
    },
  };
  return options;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userInput: FormData) => UsersApi.createUser(userInput),
    ...DefaultOptions(),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: number) => UsersApi.deleteUser(id),
    ...DefaultOptions(),
  });
};

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: (userInput: { id: number; email: string }) =>
      UsersApi.UpdateEmail(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateUserName = () => {
  return useMutation({
    mutationFn: (userInput: { id: number; userName: string }) =>
      UsersApi.updateUserName(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateFirstName = () => {
  return useMutation({
    mutationFn: (userInput: { id: number; firstName: string }) =>
      UsersApi.updateFirstName(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateLastName = () => {
  return useMutation({
    mutationFn: (userInput: { id: number; lastName: string }) =>
      UsersApi.updateLastName(userInput),
    ...DefaultOptions(),
  });
};
