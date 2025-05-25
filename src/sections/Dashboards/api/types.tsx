export type DashboardPosition = {
  dashboardId: any;
  queryId: number;
  x: number;
  y: number;
  z: number;
  h: number;
};
export type DashboardColors = {
  dashboardId: number;
  queryId: number;
  chartColor: string;
};
export type UpdateQuery = {
  name: string;
  query: string;
  outputType: string;
  databaseId: number;
  queryId?: number;
};
export type SaveQueryType = {
  name: string;
  query: string;
  outputType: string;
  databaseId: number;
};
