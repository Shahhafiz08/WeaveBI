import axios, { endpoints } from 'src/utils/axios';
// Add databases
export type CreateDatabaseParms = {
  connectionName: string;
  description: string;
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  provider: string;
};
export type getDatabaseParms = {
  connectionName: string;
  description: string;
  updatedAt: string;
};

export const databaseInfo = async ({
  connectionName,
  name,
  username,
  description,
  password,
  host,
  provider,
  port,
}: CreateDatabaseParms): Promise<void> => {
  try {
    await axios.post(endpoints.create.databse, {
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
    throw new Error('Unable to create database', error);
  }
};

// get Database list
export const getDatabase = async () => {
  try {
    const data = await axios.get(endpoints.get.database);
    return data.data;
  } catch (error) {
    throw new Error('Unable to get database data', error);
  }
};
