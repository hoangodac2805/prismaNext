import axios, { InternalAxiosRequestConfig } from "axios";
import { API_DOMAIN } from "@/config";
import Cookie from "@/helpers/cookies";
import Session from "@/helpers/sessions";


const authRequestInterceptor = (config:InternalAxiosRequestConfig) =>{
  let auth_token : string|null = null;
  if (typeof window !== "undefined") {
    auth_token = Cookie.getAuthToken() || Session.getAuthToken();
  }
  if(auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`;
  }
  config.headers.Accept = 'application/json'
  return config
}

export const baseApi = axios.create({
  baseURL: API_DOMAIN,
 
});

baseApi.interceptors.request.use(authRequestInterceptor) 