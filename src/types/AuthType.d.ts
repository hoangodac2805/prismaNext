type LoginRes = {
  user: CommonUserRes;
  token: string;
};
type RegisterRes = {
  user: CommonUserRes;
};

type VerifyTokenRes = {
  user: CommonUserRes;
};
type LoginUserInput = {
  email: string;
  password: string;
};

type RegisterUserInput = {
  email: string;
  password: string;
  userName: string;
  firstName?: string;
  lastName?: string;
};
