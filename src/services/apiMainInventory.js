import { apiBase } from './apiBase';

const apiMainInventory = apiBase.injectEndpoints({
  endpoints: build => ({
    getMainInventory: build.query({
      query: () => '/inventories/main/',
      providesTags: ['main-inventory'],
    }),
    addItemToMainInventory: build.mutation({
      query: ({ id, data }) => ({
        url: `/inventories/main/add/${id}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['main-inventory'],
    }),
    updateItemOfMainInventory: build.mutation({
      query: ({ id, data }) => ({
        url: `inventories/main/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['main-inventory'],
    }),
    sendToKitchen: build.mutation({
      query: ({ id, data }) => ({
        url: `/inventories/main/transfer/${id}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['main-inventory', 'kitchen-inventory'],
    }),
  }),
});

export const {
  useGetMainInventoryQuery,
  useAddItemToMainInventoryMutation,
  useUpdateItemOfMainInventoryMutation,
  useSendToKitchenMutation,
} = apiMainInventory;
