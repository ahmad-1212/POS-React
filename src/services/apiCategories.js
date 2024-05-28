// Ensure you use the correct import for RTK Query
import { apiBase } from "./apiBase"; // Ensure this is correctly configured and exported

// Inject endpoints into the base API
export const apiCategories = apiBase.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "/categories",
      providesTags: ["categories"],
    }),
    createCategory: build.mutation({
      query(body) {
        console.log(body);
        return {
          url: "/categories/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: build.mutation({
      query(data) {
        const { id, ...body } = data;
        console.log(body);
        return {
          url: `/categories/${id}/`,
          method: "PATCH",
          body,
        };
      },
      transformResponse: (res, meta, arg) => res.data,
      transformErrorResponse: (res, meta, arg) => res.error,
      invalidatesTags: ["categories"],
    }),
    deleteCategory: build.mutation({
      query(id) {
        return {
          url: `/categories/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
  }),
  overrideExisting: false, // Prevents overriding existing endpoints if set to true
});

// Export hooks for usage in functional components
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategories;
