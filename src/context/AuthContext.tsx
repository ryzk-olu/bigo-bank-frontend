import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { login as loginRequest } from "../services/api";

import { STORAGE_KEYS } from "../constants/storage";

import { getStorageItem } from "../utils/storage";

import type {
  AuthState,
  LoginRequest,
  User,
} from "../types/auth";


interface AuthContextValue {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  login(
    credentials: LoginRequest
  ): Promise<void>;

  logout(): void;
}


const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );


interface AuthProviderProps {
  children: ReactNode;
}


export function AuthProvider({
  children,
}: AuthProviderProps) {


  const [auth, setAuth] =
    useState<AuthState | null>(() => {

      return getStorageItem<AuthState>(
        STORAGE_KEYS.AUTH
      );

    });



  async function login(
    credentials: LoginRequest
  ) {

    const response =
      await loginRequest(credentials);



    const authData: AuthState = {

      token: response.accessToken,

      user: {
        id: 1,
        username: credentials.username,
        firstName: "John",
        lastName: "Doe",
      },

    };



    localStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify(authData)
    );


    setAuth(authData);

  }



  function logout() {

    localStorage.removeItem(
      STORAGE_KEYS.AUTH
    );


    setAuth(null);

  }



  const value =
    useMemo(
      () => ({

        user:
          auth?.user ?? null,


        token:
          auth?.token ?? null,


        isAuthenticated:
          Boolean(auth),


        login,


        logout,

      }),

      [auth]
    );



  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {

  const context =
    useContext(AuthContext);



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }



  return context;

}
