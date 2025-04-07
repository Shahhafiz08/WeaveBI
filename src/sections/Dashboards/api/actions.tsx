

import axios, { endpoints } from 'src/utils/axios';

export const getDashboardInfo = async (id: string) => {
  try {
    const dashboardinfo = await axios.get(`${endpoints.dashboard.info}/${id}`);
    return dashboardinfo.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
