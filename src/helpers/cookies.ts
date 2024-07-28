import Cookies from "js-cookie";
import { AUTH_STORAGE_NAME } from "@/config";

const Cookie = {
  setAuthToken: (token: string) => {
    Cookies.set(AUTH_STORAGE_NAME, token);
  },
  removeAuthToken: () => {
    Cookies.remove(AUTH_STORAGE_NAME);
  },
  getAuthToken: () => Cookies.get(AUTH_STORAGE_NAME),
};

export default Cookie;
