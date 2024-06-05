import { apiBase } from './apiBase';

const apiKitchenInventory = apiBase.injectEndpoints({
  endpoints: build => ({
    getKitchenInventory: build.query({
      query: () => '/inventories/kitchen/?include_all=true',
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
  overrideExisting: false,
});

export const { useGetKitchenInventoryQuery, useSendToMainMutation } =
  apiKitchenInventory;
