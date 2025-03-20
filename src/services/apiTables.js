import { apiBase } from './apiBase';

const apiTables = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get Tables
    getTables: build.query({
      query: () => '/tables',
      transformResponse: data => data.tables,
      providesTags: ['tables'],
    }),
    // Create Table
    createTable: build.mutation({
      query: () => ({
        url: '/tables',
        method: 'POST',
      }),
      invalidatesTags: ['tables'],
    }),
    // Delete Table
    deleteTable: build.mutation({
      query: id => ({
        url: `/tables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tables'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useDeleteTableMutation,
} = apiTables;
