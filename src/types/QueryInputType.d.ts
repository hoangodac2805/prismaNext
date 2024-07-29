import { Role } from "@/enums";
declare global {
  type QueryUsersInput = {
    page?: number;
    take?: number;
    search?: string;
    role?: Role;
    isActive?: boolean;
  };
}
