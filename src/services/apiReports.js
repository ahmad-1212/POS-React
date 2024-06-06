import { apiBase } from './apiBase';

const apiReports = apiBase.injectEndpoints({
  endpoints: build => ({
    getSalesReport: build.query({
      query: last => `reports/sales/?days_range=${last}`,
    }),
  }),
});

export const { useGetSalesReportQuery } = apiReports;
