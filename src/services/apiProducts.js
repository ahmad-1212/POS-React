import { apiBase } from './apiBase';

const apiProducts = apiBase.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query({
      query: () => '/products/',
      providesTags: ['products'],
    }),

    getProductWithId: build.query({
      query: id => `/products/${id}/`,
      providesTags: (result, error, id) => [{ type: 'product', id }],
    }),

    createProduct: build.mutation({
      query(data) {
        return {
          url: '/products/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['products'],
    }),

    updateProduct: build.mutation({
      query({ id, data }) {
        return {
          url: `/products/${id}/`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['products'],
    }),
    deleteProduct: build.mutation({
      query: id => ({
        url: `/products/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductWithIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiProducts;
