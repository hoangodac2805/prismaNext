import axios from "axios";
import { API_DOMAIN } from "@/config";
import Cookie from "@/helpers/cookies";
import Session from "@/helpers/sessions";

let auth_token: string | null = null;

if (typeof window !== "undefined") {
  auth_token = Cookie.getAuthToken() || Session.getAuthToken();
}

export const baseApi = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${auth_token}`,
  },
});
