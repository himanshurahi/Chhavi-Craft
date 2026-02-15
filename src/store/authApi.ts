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

/** Shape of auth payload inside the API wrapper */
export type AuthData = {
  user: AuthUser;
  token: string;
  token_type: string;
};

/** API returns { success, message, data: AuthData } */
export type AuthApiResponse = {
  success: boolean;
  message: string;
  data: AuthData;
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

/** API may return wrapped { success, message, data: { user } } */
export type UserApiResponse = {
  success?: boolean;
  message?: string;
  data?: { user: AuthUser };
  user?: AuthUser;
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
      transformResponse: (response: AuthApiResponse): RegisterResponse => {
        const { user, token, token_type } = response.data;
        if (typeof window !== "undefined" && token) {
          localStorage.setItem("chhavi_craft_token", token);
          localStorage.setItem("chhavi_craft_user", JSON.stringify(user));
        }
        return { message: response.message, user, token, token_type };
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthApiResponse): LoginResponse => {
        const { user, token, token_type } = response.data;
        if (typeof window !== "undefined" && token) {
          localStorage.setItem("chhavi_craft_token", token);
          localStorage.setItem("chhavi_craft_user", JSON.stringify(user));
        }
        return { message: response.message, user, token, token_type };
      },
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => "/user",
      transformResponse: (response: UserApiResponse): UserResponse => {
        const user = response.data?.user ?? response.user;
        if (typeof window !== "undefined" && user) {
          localStorage.setItem("chhavi_craft_user", JSON.stringify(user));
        }
        return { user: user! };
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
