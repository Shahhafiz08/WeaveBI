export type createDashboardType = {
  name: string;
  description: string;
  databaseId: number;
  tags: string[];
};
export type fetchDataType = {
  isPinned: boolean;
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tags: string[];
  databaseId: number;
};
