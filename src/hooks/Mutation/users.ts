import { UsersApi } from "@/services/api";
import { USER_ENDPOINT } from "@/services/endpoint";
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const defaultOptions = () => {
  const queryClient = useQueryClient();

  const options: MutationOptions<any, any, any> = {
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: [USER_ENDPOINT] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_ENDPOINT] });
    },
  };
  return options;
};

export const useCreateUser = () => {

  return useMutation({
    mutationFn: (userInput: FormData) => UsersApi.createUser(userInput),
    ...defaultOptions(),
  });
};

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: (userInput: { id: number; email: string }) =>
      UsersApi.UpdateEmail(userInput),
    ...defaultOptions(),
  });
};
