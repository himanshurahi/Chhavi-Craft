import { api } from "./baseApi";

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

export const authApi = api.injectEndpoints({
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

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLogoutMutation,
} = authApi;
