export const ROUTER = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS :"/dashboard/users",
  USERS_ADD: "/dashboard/users/add",
  USERS_DETAIL: "/dashboard/users/",
};

export const NO_PROTECT_ROUTER = [ROUTER.LOGIN, ROUTER.REGISTER];
export const AUTH_ROUTER = [ROUTER.LOGIN, ROUTER.REGISTER]
