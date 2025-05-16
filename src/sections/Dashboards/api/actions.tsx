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
type DashboardColors = {
  dashboardId: number;
  queryId: number;
  chartColor: string;
};
type UpdateQuery = {
  name: string;
  query: string;
  outputType: string;
  databaseId: number;
  queryId?: number;
};
// Get dashboard queries
export const getDashboardInfo = async (id: string) => {
  try {
    const dashboardinfo = await axios.get(`${endpoints.dashboard.info}/${id}/info`);
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
// delete a query
export const deleteQuery = async (queryId: number) => {
  const responce = await axios.delete(`${endpoints.query.delete}/${queryId}`);
  return responce;
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
// Update colors
export const updateQueryColors = async ({ dashboardId, queryId, chartColor }: DashboardColors) => {
  console.log('Api chart color', chartColor);
  const response = await axios.patch(endpoints.dashboard.colors, {
    colors: [
      {
        dashboardId,
        queryId,
        chartColor,
      },
    ],
  });

  return response.data;
};
//  update a query
export const updateQuery = async ({
  name,
  query,
  outputType,
  databaseId,
  queryId,
}: UpdateQuery) => {
  const responce = await axios.patch(`${endpoints.query.update}/${queryId}`, {
    name,
    query,
    outputType,
    databaseId,
  });
  return responce.data;
};
