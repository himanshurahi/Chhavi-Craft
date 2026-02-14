import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: AuthUser;
  token: string;
  token_type: string;
};

export type LoginResponse = {
  message: string;
  user: AuthUser;
  token: string;
  token_type: string;
};

export type UserResponse = {
  user: AuthUser;
};

export type LogoutResponse = {
  message: string;
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE.replace(/\/$/, ""),
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("chhavi_craft_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: RegisterResponse) => {
        if (typeof window !== "undefined" && response.token) {
          localStorage.setItem("chhavi_craft_token", response.token);
          localStorage.setItem("chhavi_craft_user", JSON.stringify(response.user));
        }
        return response;
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: LoginResponse) => {
        if (typeof window !== "undefined" && response.token) {
          localStorage.setItem("chhavi_craft_token", response.token);
          localStorage.setItem("chhavi_craft_user", JSON.stringify(response.user));
        }
        return response;
      },
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => "/user",
      transformResponse: (response: UserResponse) => {
        if (typeof window !== "undefined" && response.user) {
          localStorage.setItem("chhavi_craft_user", JSON.stringify(response.user));
        }
        return response;
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useLazyGetUserQuery, useLogoutMutation } = authApi;
