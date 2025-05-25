export type QueryResponse = {
  datasetLabel?: string;
  labels?: string[];
  values?: number[];
  query: Query;
};

export type Query = {
  databaseId: number;
  name: string;
  id: number;
  query: string;
  outputType: string;
  colors: {
    chartColor: string;
  };
  data: QueryChartData | any | ScatterChartData;
};

export type QueryChartData = {
  datasets: Array<string | number>;
  labels: Array<string>;
  values: Array<number | string>;
  datasetLabel: Array<string>;
};

export type QuerySingleValueData = {
  count: string | number;
  value: string | number;
};
export type ScatterChartData = {
  graph_type: string;
  title: string;
  datasetLabel: string;
  labels: Array<string>;
  values: any;
};
