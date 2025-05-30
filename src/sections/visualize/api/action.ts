import axios, { endpoints } from 'src/utils/axios';

import type { createDashboardType } from '../types/types';

export const createDashboard = async ({
  name,
  description,
  databaseId,
  tags,
}: createDashboardType) => {
  const response = await axios.post(`${endpoints.dashboard.create}`, {
    name,
    description,
    databaseId,
    tags,
  });
  console.log(response.data);
  return response.data;
};
