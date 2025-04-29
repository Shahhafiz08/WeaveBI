import { toast } from 'react-toastify';

import axios, { endpoints } from 'src/utils/axios';

type DashboardPosition = {
  dashboardId: any;
  queryId: number;
  x: number;
  y: number;
  z: number;
  h: number;
};
// Get dashboard queries
export const getDashboardInfo = async (id: string) => {
  try {
    const dashboardinfo = await axios.get(`${endpoints.dashboard.info}/${id}`);
    return dashboardinfo.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// Updadate dashboard Queries
export const parallellyRunAllQueries = async (id: string) => {
  try {
    const dashboardinfo = await axios.get(`${endpoints.query.runAllQueriesAgain}/${id}`);
    toast.success('Dashboard refreshed');
    return dashboardinfo;
  } catch (error) {
    toast.error(error);
  }
  return null;
};
// download chart data
export const downloadChartData = async (id: number) => {
  const response = await axios.get(`${endpoints.query.downloadCharts}${id}`);

  return response.data;
};

// download chart data
export const downloadTabularData = async (id: number) => {
  const response = await axios.get(`${endpoints.query.downloadTabular}${id}`);
  return response.data;
};
// generate query insights
export const generateQueryInsights = async (
  id: number,
  browseOnline?: boolean,
  customInstructions?: string
) => {
  const response = await axios.get(
    `${endpoints.query.insights}/${id}?search=${browseOnline ?? null}&customInstructions=${customInstructions ?? null}`
  );

  return response.data;
};

// Update query positions
export const updateQueryPosition = async ({
  dashboardId,
  queryId,
  x,
  y,
  z,
  h,
}: DashboardPosition) => {
  const response = await axios.put(endpoints.dashboard.positions, {
    positions: [
      {
        dashboardId: +dashboardId,
        queryId: +queryId,
        x,
        y,
        z,
        h,
      },
    ],
  });
  return response?.data;
};
// delete a query
export const deleteQuery = async (queryId: number) => {
  const responce = await axios.delete(`${endpoints.query.delete}/${queryId}`);
  return responce;
};
