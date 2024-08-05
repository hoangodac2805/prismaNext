import Cookies from "js-cookie";
import { AUTH_STORAGE_NAME } from "@/config";

const Cookie = {
  setAuthToken: (token: string,expires:number) => {
    Cookies.set(AUTH_STORAGE_NAME, token,{expires:expires});
  },
  removeAuthToken: () => {
    Cookies.remove(AUTH_STORAGE_NAME);
  },
  getAuthToken: () => Cookies.get(AUTH_STORAGE_NAME),
};

export default Cookie;
