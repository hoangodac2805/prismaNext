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

  type EditUserField = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: FormData;
    avatarId?: number;
  };

  type AddUserField = {
    userName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: { file: UploadFile; fileList: UploadFile[] };
  };

  type CreateUserInput = FormData

  type DeleteUserInput = string | number;

  type GetUserByParamInput = string | number;
 
  type UpdateEmailInput = {
    id: number;
    email: string
  }
  type UpdateUserNameInput = {
    id: number;
    userName: string
  }
  type UpdateFirstNameInput = {
    id: number;
    firstName: string
  }
  type UpdateLastNameInput = {
    id: number;
    lastName: string
  }
  type UpdateAvatarInput = FormData

  type UpdateAvatarByUsedInput = {
    id: number;
    avatarUUID: string
  }
  
  type DeleteUsedAvatarInput = {
    id: number
    avatarUUID: string
  }
}
