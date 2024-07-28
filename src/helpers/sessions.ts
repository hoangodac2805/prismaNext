import { AUTH_STORAGE_NAME } from "@/config";

const Session = {
  setAuthToken: (token: string) => {
    sessionStorage.setItem(AUTH_STORAGE_NAME, token);
  },
  removeAuthToken: () => {
    sessionStorage.removeItem(AUTH_STORAGE_NAME);
  },
  getAuthToken: () => sessionStorage.getItem(AUTH_STORAGE_NAME),
};

export default Session;
