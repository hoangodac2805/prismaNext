type Avatar = {
  id: number;
  uuid: string;
  url: string;
  currentUser?: User;
  currentUserId?: number;
  usedUser?: User;
  usedUserId?: number;
  createdAt: Date;
  updatedAt: Date;
};
