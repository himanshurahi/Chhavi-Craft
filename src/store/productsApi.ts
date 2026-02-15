import { api } from "./baseApi";

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  sku?: string;
  category_id: number;
  price: number;
  actual_price: number;
  stock: number;
  image?: string;
  image_url?: string | null;
  /** Multiple images (gallery). Falls back to image_url if only one image. */
  image_urls?: (string | null)[];
  is_best_seller?: boolean;
  sort_order?: number;
  details?: Record<string, unknown>;
  category?: ProductCategory;
};

export type GetProductsParams = {
  category?: string | number;
  best_seller?: 0 | 1;
};

type ProductsListResponse = {
  success: boolean;
  message: string;
  data: Product[];
};

type ProductSingleResponse = {
  success: boolean;
  message: string;
  data: Product;
};

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsParams | void>({
      query: (params) => ({
        url: "/products",
        params: params ?? {},
      }),
      transformResponse: (response: ProductsListResponse) => response.data,
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      transformResponse: (response: ProductSingleResponse) => response.data,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery, useLazyGetProductBySlugQuery } =
  productsApi;
