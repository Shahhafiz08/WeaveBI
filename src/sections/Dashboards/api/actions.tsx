// Dashboard queries with data

import axios, { endpoints } from 'src/utils/axios';

export const getDashboardInfo = async (id: number) => {
  try {
    const dashboardinfo = await axios.get(`${endpoints.dashboard.info}/${id}`);
    return dashboardinfo.data;
  } catch (error) {
    throw error(error);
  }
};
