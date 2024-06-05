import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

// Custom error handling function
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ baseUrl: config.get('API_URL') });

  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR': {
        return {
          error: {
            message: 'Failed to fetch',
          },
        };
      }
    }
  }
  return result;
};

// Base API slice
export const apiBase = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}), // Initial empty endpoints; will be injected later
});
