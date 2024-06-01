import { apiBase } from './apiBase';

const apiTables = apiBase.injectEndpoints({
  endpoints: build => ({
    getTables: build.query({
      query: () => '',
    }),
  }),
  overrideExisting: false,
});

export const { useGetTablesQuery } = apiTables;
