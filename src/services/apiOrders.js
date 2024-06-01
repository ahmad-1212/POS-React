import { apiBase } from './apiBase';

const apiOrders = apiBase.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query({
      query: () => '/orders/',
      providesTags: ['orders'],
    }),
    createOrder: build.mutation({
      query: data => ({
        url: '/orders/',
        method: 'POST',
        body: data,
      }),
    }),
    getActiveOrders: build.mutation({
      query: () => '',
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetActiveOrdersMutation,
} = apiOrders;
