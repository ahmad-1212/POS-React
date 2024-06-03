import { apiBase } from './apiBase';

const apiTables = apiBase.injectEndpoints({
  endpoints: build => ({
    getTables: build.query({
      query: () => '/tables/?reserved_only',
      providesTags: ['tables'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTablesQuery } = apiTables;
