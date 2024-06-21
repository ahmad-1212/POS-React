import { apiBase } from './apiBase';

const apiDeals = apiBase.injectEndpoints({
  endpoints: build => ({
    getDeals: build.query({
      query: () => '/deals/',
    }),
    createDeal: build.mutation({
      query: data => ({ url: '/deals/', method: 'POST', body: data }),
    }),
    updateDeal: build.mutation({
      query: (id, data) => ({ url: `/deals/${id}`, method: 'PUT', body: data }),
    }),
    deleteDeal: build.mutation({
      query: id => ({ url: `/deals/${id}/`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDealsQuery,
  useCreateDealMutation,
  useDeleteDealMutation,
  useUpdateDealMutation,
} = apiDeals;
