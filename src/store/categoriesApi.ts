import { api } from "./baseApi";

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  sort_order: number;
};

type CategoriesListResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

type CategorySingleResponse = {
  success: boolean;
  message: string;
  data: Category;
};

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: CategoriesListResponse) => response.data,
    }),
    getCategoryBySlug: builder.query<Category, string>({
      query: (slug) => `/categories/${slug}`,
      transformResponse: (response: CategorySingleResponse) => response.data,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryBySlugQuery } = categoriesApi;
