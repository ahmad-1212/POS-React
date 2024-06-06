import { apiBase } from './apiBase';

const apiReports = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get sales report
    getSalesReport: build.query({
      query: last => `reports/sales/?days_range=${last}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSalesReportQuery } = apiReports;
