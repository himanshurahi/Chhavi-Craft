import { api } from "./baseApi";

// Placeholder for future cart endpoints
// e.g. getCart, addToCart, updateCart, removeFromCart, etc.

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getCart: builder.query<CartResponse, void>({
    //   query: () => "/cart",
    // }),
    // addToCart: builder.mutation<CartResponse, AddToCartRequest>({
    //   query: (body) => ({ url: "/cart", method: "POST", body }),
    // }),
  }),
});

// export const { useGetCartQuery, useAddToCartMutation } = cartApi;
