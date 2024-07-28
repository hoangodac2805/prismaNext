import { Role } from "@/enums";
declare global {
  type User = {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    avatar?: Avatar;
    usedAvatar?: Avatar[];
    tokenVersion: number;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };

  type CommonUserRes = Omit<User, "password">;
}
