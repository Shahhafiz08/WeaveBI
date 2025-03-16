import axios, { endpoints } from 'src/utils/axios';
// Select database............

export const selectDatabase = async () => {
  const database = await axios.get(endpoints.database.get);
  return database.data;
};
// Execute query............
export type createQueryType = {
  name: string;
  query: string;
  outputType: string;
  databaseId: number;
  selectedChart?: string;
};

export type QueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  name: string;
  query: string;
  outputType: string;
  databaseId: number;
};

export enum OutPutType {
  Charts = 'CHARTS',
}

export const createQuery = async ({
  name,
  query,
  outputType,
  databaseId,
  selectedChart,
}: createQueryType): Promise<QueryResponse> => {
  if (outputType.toLowerCase() === OutPutType.Charts.toLowerCase()) {
    outputType = selectedChart as string;
  }
  const response = await axios.post(endpoints.query.save, {
    name,
    query,
    outputType,
    databaseId,
  });

  return response?.data;
};

// Run query.........
export const runAQuery = async (id: number): Promise<void> => {
  await axios.get(`${endpoints.query.run}/${id}`);
};
