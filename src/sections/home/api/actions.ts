import axios, { endpoints } from 'src/utils/axios';
// Add databases
export type createDatabaseParms = {
  connectionName: string;
  description: string;
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  provider: string;
};

export const connectDatabase = async ({
  connectionName,
  name,
  username,
  description,
  password,
  host,
  provider,
  port,
}: createDatabaseParms): Promise<void> => {
  try {
    await axios.post(endpoints.database.create, {
      connectionName,
      name,
      username,
      password,
      host,
      provider,
      port,
      description,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Test Database connection
export type testDatabaseParams = {
  connectionName: string;
  description: string;
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  provider: string;
};
export const testDatabase = async ({
  connectionName,
  name,
  username,
  description,
  password,
  host,
  provider,
  port,
}: testDatabaseParams): Promise<void> => {
  try {
    await axios.post(endpoints.database.test, {
      connectionName,
      name,
      username,
      password,
      host,
      provider,
      port,
      description,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// Get database count
export async function totalDatabaseCount() {
  try {
    const response = await axios.get(endpoints.database.count);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// Get Total query count of a user across all databases
export async function totalQueryCount() {
  try {
    const response = await axios.get(endpoints.query.totalQueryCount);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// get total dashboards count of a user across all databases

export async function totalDashboardCount() {
  try {
    const response = await axios.get(endpoints.dashboard.totalDashboardCount);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// get total dashboard details
export async function getDashboardResponse() {
  try {
    const response = await axios.get(endpoints.dashboard.listOfDashboards);
    return response.data;
  } catch (error) {
    const { message } = error;
    throw message;
  }
}
// Delete a dashboard
export async function deleteDashboardResponse(id: number) {
  try {
    await axios.delete(`${endpoints.dashboard.delete}/${id}`);
  } catch (error) {
    throw new Error('Unable to delete dashboard');
  }
}
// Pin Dashboard
export async function pinDashboardResponse(id: number) {
  try {
    await axios.patch(`${endpoints.dashboard.pin}/${id}/pin`);
  } catch (error) {
    throw error(error);
  }
}
// Get Pinned dashboards
export async function pinnedDashboardsResponse(pageNo: number, isPinned: boolean) {
  const response = await axios.get(
    `${endpoints.dashboard.pinnedDashboards}?page=${pageNo}&limit=10&isPinned=${isPinned}`
  );

  return response.data;
}
