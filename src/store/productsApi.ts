import { api } from "./baseApi";

// Placeholder for future product endpoints
// e.g. getProducts, getProductBySlug, searchProducts, etc.

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query<ProductsResponse, ProductsParams>({
    //   query: (params) => ({ url: "/products", params }),
    // }),
    // getProductBySlug: builder.query<ProductResponse, string>({
    //   query: (slug) => `/products/${slug}`,
    // }),
  }),
});

// export const { useGetProductsQuery, useGetProductBySlugQuery } = productsApi;
