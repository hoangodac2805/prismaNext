import { Role } from "@/enums";
import { UploadFile } from "antd";
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
    usedAvatars?: Avatar[];
    tokenVersion: number;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };

  type CommonUserRes = Omit<User, "password">;

  type QueryUsersRes = {
    users: Array<CommonUserRes>;
    paginate: Paginate;
  };

  type QueryUserRes = {
    user: CommonUserRes;
  };

  type EditUserInput = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: FormData;
    avatarId?: number;
  };

  type AddUserInput = {
    userName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: { file: UploadFile; fileList: UploadFile[] };
  };
}
