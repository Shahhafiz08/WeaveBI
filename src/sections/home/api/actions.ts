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
export type testDatabaseParms = {
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
}: testDatabaseParms): Promise<void> => {
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
    const responce = await axios.get(endpoints.database.count);
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// Get Total query count of a user across all databases
export async function totalQueryCount() {
  try {
    const responce = await axios.get(endpoints.query.totalQueryCount);
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// get total dashboards count of a user across all databases

export async function totalDashboardCount() {
  try {
    const responce = await axios.get(endpoints.dashboard.totalDashboardCount);
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// get total dashboard details
export async function getDashboardResponce() {
  try {
    const responce = await axios.get(endpoints.dashboard.listOfDashboards);
    return responce.data;
  } catch (error) {
    const {message} = error
   throw message;
  }
}
