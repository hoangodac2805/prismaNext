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
    mutationFn: (userInput: CreateUserInput) => UsersApi.createUser(userInput),
    ...DefaultOptions(),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: DeleteUserInput) => UsersApi.deleteUser(id),
    ...DefaultOptions(),
  });
};

export const useDeleteUsedAvatar = () => {
  return useMutation({
    mutationFn: (userInput: DeleteUsedAvatarInput) => UsersApi.deleteUsedAvatar(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: (userInput: UpdateEmailInput) =>
      UsersApi.UpdateEmail(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateUserName = () => {
  return useMutation({
    mutationFn: (userInput: UpdateUserNameInput) =>
      UsersApi.updateUserName(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateFirstName = () => {
  return useMutation({
    mutationFn: (userInput: UpdateFirstNameInput) =>
      UsersApi.updateFirstName(userInput),
    ...DefaultOptions(),
  });
};

export const useUpdateLastName = () => {
  return useMutation({
    mutationFn: (userInput: UpdateLastNameInput) =>
      UsersApi.updateLastName(userInput),
    ...DefaultOptions(),
  });
};


export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: (form:UpdateAvatarInput) =>
      UsersApi.updateAvatar(form),
    ...DefaultOptions(),
  });
};

export const useUpdateAvatarByUsed = () => {
  return useMutation({
    mutationFn: (userInput:UpdateAvatarByUsedInput) =>
      UsersApi.updateAvatarByUsed(userInput),
    ...DefaultOptions(),
  });
};