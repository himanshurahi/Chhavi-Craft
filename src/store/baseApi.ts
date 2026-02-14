import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE.replace(/\/$/, ""),
  prepareHeaders: (headers) => {
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

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};
