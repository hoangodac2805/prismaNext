"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { notification } from "antd";
import axios from "axios";
import Cookie from "@/helpers/cookies";
import Session from "@/helpers/sessions";
import { AuthApi } from "@/services/api";
import Loading from "@/components/Loading";
import { AUTH_ROUTER, NO_PROTECT_ROUTER, ROUTER } from "@/config/router";
import { getErrorMessageAxiosError } from "@/utils";
import LoginForm from "@/components/AuthForm/LoginForm";
import useLoadingScreen from "@/hooks/useLoadingScreen";
import { Role } from "@/enums";
interface IAuthContext {
  authed: boolean;
  loading: boolean;
  loginedUser: LoginRes["user"] | undefined;
  login: (input: LoginUserInput, remember: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode | React.ReactElement;
}> = ({ children }) => {
  const [authed, setAuthed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loginedUser, setLoginedUser] = React.useState<
    LoginRes["user"] | undefined
  >(undefined);
  const { setLoadingOn, setLoadingOff } = useLoadingScreen();
  const login = async (input: LoginUserInput, remember: boolean = false) => {
    setLoading(true);
    AuthApi.Login(input)
      .then((res) => {
        if ([Role.ADMIN, Role.SUPERADMIN].includes(res.data.user.role)) {
          if (remember) {
            Cookie.setAuthToken(res.data.token);
          } else {
            Session.setAuthToken(res.data.token);
          }
          notification.success({ message: "Đăng nhập thành công" });
          setAuthed(true);
          setLoginedUser(res.data.user);
        } else {
          notification.warning({ message: "Không đủ quyền truy cập! " });
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          notification.error({
            message: "Đăng nhập không thành công!",
            description: getErrorMessageAxiosError(error),
          });
          return;
        }
        notification.error({ message: "Đăng nhập không thành công!" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoginedUser(undefined);
    Cookie.removeAuthToken();
    Session.removeAuthToken();
    setAuthed(false);
  };

  useEffect(() => {
    if (authed) {
      setLoading(false);
      return;
    }
    const verifyToken = () => {
      let authToken = Cookie.getAuthToken() || Session.getAuthToken();
      if (authToken) {
        AuthApi.VerifyToken()
          .then((res) => {
            setAuthed(true);
            setLoginedUser(res.data.user);
          })
          .catch((error) => {});
      }
      setLoading(false);
    };
    verifyToken();
  }, []);
  useEffect(() => {
    if (loading) {
      setLoadingOn();
    } else {
      setLoadingOff();
    }
  }, [loading]);
  return (
    <AuthContext.Provider
      value={{ authed, loading, loginedUser, login, logout }}
    >
      <AuthCheck>{children}</AuthCheck>
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthCheck = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  const { authed, loading } = useAuth();
  const [render, setRender] = useState<React.ReactNode | React.ReactElement>(
    <Loading />
  );
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if (loading) return;
    if (authed) {
      if (AUTH_ROUTER.includes(pathname) || [ROUTER.HOME].includes(pathname)) {
        router.push(ROUTER.DASHBOARD);
        return;
      }
      setRender(children);
      return;
    }

    if (NO_PROTECT_ROUTER.includes(pathname)) {
      setRender(children);
      return;
    }
    setRender(<LoginForm />);
  }, [children, pathname, loading, router, authed]);
  return <>{render}</>;
};

export default AuthContext;
