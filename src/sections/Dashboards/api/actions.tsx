import { toast } from 'react-toastify';

import axios, { endpoints } from 'src/utils/axios';

import type { UpdateQuery, SaveQueryType, DashboardColors, DashboardPosition } from './types';

// Get dashboard queries
export const getDashboardInfo = async (id: number) => {
  try {
    const response = await axios.get(`${endpoints.dashboard.info}/${id}/info`);
    return response.data;
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
    `${endpoints.query.insights}/{${id}}/insights?search=${browseOnline}&customInstructions=${customInstructions}`
  );

  return response.data;
};
// Unlink a query
export const unlinkQueryFromDashboard = async ({
  queryId,
  dashboardId,
}: {
  queryId: number;
  dashboardId: number;
}) => {
  const responce = await axios.post(`${endpoints.query.unlinkQueryFromDashboard}`, {
    queryId,
    dashboardId,
  });
  return responce.data;
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

//  Add query
export const addQuery = async ({ name, query, outputType, databaseId }: SaveQueryType) => {
  const response = await axios.post(`${endpoints.query.save}/save-run?save=true`, {
    name,
    query,
    outputType,
    databaseId,
  });

  return { message: response.data.message, queryId: response.data.data.id };
};
export const linkQueryToDashbord = async ({
  queryId,
  dashboardId,
}: {
  queryId: number;
  dashboardId: number;
}) => {
  const response = await axios.post(`${endpoints.query.linkToDashbord}`, {
    queryId,
    dashboardId,
  });
  return response.data;
};
// Run an existing Query
export const runExistingQuery = async (queryId: number) => {
  const response = await axios.get(`${endpoints.query.runExistingQuery}/${queryId}`);
  return response.data;
};
