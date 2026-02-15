import { api } from "./baseApi";

export type CartItem = {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  subtotal: number;
  image_url: string | null;
};

export type CartResponse = {
  items: CartItem[];
  items_count: number;
  subtotal: number;
};

/** API returns { success, message, data: CartResponse } */
export type CartApiResponse = {
  success: boolean;
  message: string;
  data: CartResponse;
};

function unwrapCart(response: CartApiResponse | CartResponse): CartResponse {
  if ("data" in response && response.data) return response.data;
  return response as CartResponse;
}

export type AddToCartRequest = {
  product_id: number;
  quantity?: number;
};

export type UpdateCartItemRequest = {
  quantity: number;
};

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
      transformResponse: (response: CartApiResponse | CartResponse) =>
        unwrapCart(response),
    }),
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body: { product_id: body.product_id, quantity: body.quantity ?? 1 },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response: CartApiResponse | CartResponse) =>
        unwrapCart(response),
    }),
    updateCartItem: builder.mutation<
      CartResponse,
      { cartItemId: number; quantity: number }
    >({
      query: ({ cartItemId, quantity }) => ({
        url: `/cart/items/${cartItemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response: CartApiResponse | CartResponse) =>
        unwrapCart(response),
    }),
    removeCartItem: builder.mutation<CartResponse, number>({
      query: (cartItemId) => ({
        url: `/cart/items/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response: CartApiResponse | CartResponse) =>
        unwrapCart(response),
    }),
    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response: CartApiResponse | CartResponse) =>
        unwrapCart(response),
    }),
  }),
});

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
