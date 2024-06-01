import { apiBase } from './apiBase';

const apiIngredients = apiBase.injectEndpoints({
  endpoints: build => ({
    getIngredients: build.query({
      query: page => `/ingredients/?page=${page}`,
      providesTags: ['ingredients'],
    }),
    createIngredient: build.mutation({
      query: data => ({ url: '/ingredients/', method: 'POST', body: data }),
      invalidatesTags: ['ingredients'],
    }),
    updateIngredient: build.mutation({
      query({ id, ...data }) {
        return {
          url: `/ingredients/${id}/`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['ingredients'],
    }),
    deleteIngredient: build.mutation({
      query: id => ({ url: `/ingredients/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['ingredients'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIngredientsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  usePrefetch,
} = apiIngredients;
