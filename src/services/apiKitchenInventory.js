import { apiBase } from './apiBase';

const apiKitchenInventory = apiBase.injectEndpoints({
  endpoints: build => ({
    getKitchenInventory: build.query({
      query: () => '/inventories/kitchen/',
      providesTags: ['kitchen-inventory'],
    }),
    sendToMain: build.mutation({
      query: ({ id, data }) => ({
        url: `/inventories/kitchen/transfer/${id}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['kitchen-inventory', 'main-inventory'],
    }),
  }),
});

export const { useGetKitchenInventoryQuery, useSendToMainMutation } =
  apiKitchenInventory;
