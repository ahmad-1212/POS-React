import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { toast } from 'react-toastify';

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

      default: {
        const firstValue = Object.keys(result?.error?.data)[0];
        console.log(firstValue);
        if (Array.isArray(result.error.data[firstValue])) {
          let message = '';
          console.log(message);
          Object.keys(result.error.data).forEach(key => {
            console.log(result.error.data[key][0]);
            message = message + `${key}: ` + result.error.data[key][0];
          });
          toast.error(message, { autoClose: 6000 });
        }
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
