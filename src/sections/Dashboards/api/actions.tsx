// Dashboard queries with data

import axios, { endpoints } from 'src/utils/axios';

export const getDashboardInfo = async () => {
  try {
    const dashboardinfo = await axios.get(endpoints.dashboard.info);
    return dashboardinfo.data;
  } catch (error) {
    throw error(error);
  }
};
