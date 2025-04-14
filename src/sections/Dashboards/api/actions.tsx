import axios, { endpoints } from 'src/utils/axios';

type DashboardPosition = {
  dashboardId: number;
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
  const dashboardinfo = await axios.get(`${endpoints.query.runAllQueriesAgain}/${id}`);
  return dashboardinfo;
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

// Update query positions.
export const updateQueryPosition = async ({
  dashboardId,
  queryId,
  x,
  y,
  z,
  h,
}: DashboardPosition) => {
  try {
    const response = await axios.put(endpoints.dashboard.positions, {
      dashboardId,
      queryId,
      x,
      y,
      z,
      h,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating query position:', error);
    throw error;
  }
};
