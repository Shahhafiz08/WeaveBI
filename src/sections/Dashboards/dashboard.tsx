import { useParams } from 'react-router';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

import { Box, Stack, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import Tabular from './components/tabular';
import { BarChart } from './components/bar-chart';
import { PieChart } from './components/pie-chart';
import Descriptive from './components/descriptive';
import { LineChart } from './components/line-chart';
import { ScatterChart } from './components/scatter-chart';
import { StackedChart } from './components/stacked-chart';
import { DoughnutChart } from './components/doughnut-chart';
import useDashboardDetails from './hooks/dashboard-details';
import DashboardHeader from './components/dashboard-header';

export interface Query {
  id: number;
  name: string;
  query: string;
  outputType: string;
  generatedSqlQuery: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  databaseId: number;
  userId: number;
  position: any;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { id } = useParams();
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const { chartColors, dashboardData, errors, loading } = useDashboardDetails({ id: id as string });

  const renderChart = (query: any) => {
    if (!query.data) {
      return null;
    }

    const _heading = Array.isArray(query.data) ? Object.keys(query.data[0]) : [];

    // for descriptive
    if (query.outputType.toLowerCase() === 'descriptive') {
      return <Descriptive queryid={query.id} queryName={query.name} queryData={query.data} />;
    }

    // for singleValue

    if (query.outputType.toLowerCase() === 'singlevalue') {
      return (
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            textAlign: 'start',
            p: 3,
            borderRadius: 2,
            bgcolor: 'white',
          }}
        >
          <Typography sx={{ marginBottom: '15px' }}>{query.name}</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              p: 2,
              bgcolor: '#F5F5F5',

              borderRadius: 1,
            }}
          >
            <Typography color="primary" variant="h1">
              {Object.values(query.data[0])}
            </Typography>
          </Box>
        </Stack>
      );
    }
    // For tabular data
    if (
      query.outputType.toLowerCase() === 'tabular' &&
      (!query.data.graph_type || typeof query.data !== 'object')
    ) {
      return (
        <Tabular
          queryData={query.data}
          queryName={query.name}
          queryid={query.id}
          heading={_heading}
        />
      );
    }
    // For chart data
    if (query.data && query.data.graph_type) {
      const { title, labels, datasets, values, datasetLabel } = query.data;

      switch (query.data.graph_type.toLowerCase()) {
        case 'bar':
          if (query.outputType.toLowerCase() === 'stacked chart') {
            return (
              <StackedChart
                labels={labels}
                chartData={query.data.datasets}
                queryId={query.id}
                title={title}
                backgroundcolor={chartColors.slice(0, datasets.data?.length)}
              />
            );
          }

          return (
            <BarChart
              chartData={query.data.datasets}
              labels={labels}
              title={title}
              queryId={query.id}
              backgroundcolor={chartColors.slice(0, datasets.data?.length)}
            />
          );

        case 'doughnut':
          return (
            <DoughnutChart
              queryId={query.id}
              title={title}
              labels={labels}
              values={values}
              backgroundcolor={chartColors.slice(0, values.length)}
              datasetLabel={datasetLabel}
            />
          );

        case 'pie':
          return (
            <PieChart
              labelss={labels}
              values={values}
              backgroundcolor={chartColors.slice(0, values.length)}
              datasetLabel={datasetLabel}
              queryId={query.id}
              title={title}
            />
          );

        case 'line':
          return (
            <LineChart
              title={title}
              queryId={query.id}
              labels={labels}
              values={values}
              backgroundcolor={chartColors.slice(0, values.length)}
              datasetLabel={datasetLabel}
            />
          );

        case 'scatter':
          return (
            <ScatterChart
              title={title}
              queryId={query.id}
              chartData={query.data.datasets}
              backgroundcolor={chartColors.slice(0, values?.length)}
            />
          );

        default:
          return null;
      }
    }
    return null;
  };

  if (loading) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  if (errors) {
    return <Typography color="error">{errors}</Typography>;
  }

  const renderableQueries = dashboardData?.queries.filter(
    (query: { data: any; outputType: string }) =>
      query.data &&
      (query.outputType.toLowerCase() === 'tabular' ||
        query.outputType.toLowerCase() === 'descriptive' ||
        query.outputType.toLowerCase() === 'singlevalue' ||
        (query.data.graph_type &&
          ['bar', 'pie', 'line', 'stacked', 'scatter', 'doughnut', 'singleValue'].includes(
            query.data.graph_type.toLowerCase()
          )))
  );
  const chartLayoutConfig: Record<string, { w?: number; h?: number }> = {
    bar: { w: 12, h: 6 },
    'scatter plot': { w: 22, h: 6 },
    pie: { w: 15, h: 7 },
    doughnut: { w: 15, h: 7 },
    line: { w: 16, h: 4 },
    Stacked: { w: 22, h: 5 },
    tabular: { w: 30, h: 7 },
    descriptive: { w: 14, h: 5 },
    singlevalue: { w: 8, h: 4 },
  };
  const layouts = {
    lg:
      renderableQueries?.map((query: any, index: number) => {
        const { w, h } = chartLayoutConfig[query.outputType.toLowerCase().trim()] || {
          w: 15,
          h: 6,
        };
        const perRow = Math.floor(50 / 15);

        return {
          i: query.id.toString(),
          x: (index % perRow) * 15,
          y: Math.floor(index / perRow) * 6,
          w,
          h,
        };
      }) || [],
  };

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
      }}
    >
      <DashboardHeader renderableQueries={renderableQueries} dashboardData={dashboardData?.name} />

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 50, md: 50, sm: 16, xs: 10 }}
        rowHeight={50}
        autoSize
        isDraggable
        isResizable
      >
        {renderableQueries?.map((query: any, index: number) => (
          <div key={query.id.toString()} data-grid={layouts.lg[index]}>
            <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
              {renderChart(query)}
            </Box>
          </div>
        ))}
      </ResponsiveGridLayout>
    </DashboardContent>
  );
};

export default Dashboard;
