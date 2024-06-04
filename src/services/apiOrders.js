import { apiBase } from './apiBase';

const apiOrders = apiBase.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query({
      query: (page = 1) =>
        `/orders/?include_cart=true&page=${page}&active_only=false`,
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
      invalidatesTags: ['active-orders'],
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `orders/${id}/?include_cart=false`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['active-orders', 'orders'],
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
  useUpdateOrderStatusMutation,
  usePrefetch,
} = apiOrders;
