import { apiBase } from './apiBase';

const apiOrders = apiBase.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query({
      query: () => '/orders/',
      providesTags: ['orders'],
    }),
    getOrderByID: build.mutation({
      query: id => `orders/${id}/?include_cart=true`,
    }),
    createOrder: build.mutation({
      query: data => ({
        url: '/orders/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['active-orders'],
    }),
    getActiveOrders: build.query({
      query: () => '/orders/?include_cart=true&acitve_only=true',
      providesTags: ['active-orders'],
    }),
    updateOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetActiveOrdersQuery,
  useGetOrderByIDMutation,
  useUpdateOrderMutation,
} = apiOrders;
