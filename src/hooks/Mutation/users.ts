import { UsersApi } from "@/services/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: (userInput: { id: number; email: string }) => UsersApi.UpdateEmail(userInput),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["users"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
