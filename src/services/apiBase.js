import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

export const apiBase = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.get('API_URL') }),
  endpoints: () => ({}), // Initial empty endpoints; will be injected later
});
