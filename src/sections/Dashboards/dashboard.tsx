import { useParams } from 'react-router';
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

import { Box, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import Tabular from './components/tabular';
import { BarChart } from './components/bar-chart';
import { PieChart } from './components/pie-chart';
import Descriptive from './components/descriptive';
import SingeValue from './components/signle-value';
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

  const {
    chartColors,
    dashboardData,
    errors,
    editDashboard,
    edit,
    loading,
    handleClose,
    anchorRef,
    handleToggle,
    open,
    renderableQueries,
    layouts,
    ResponsiveGridLayout,
  } = useDashboardDetails({
    id: id as string,
  });

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
      return <SingeValue qeryName={query.name} queryData={query.data} />;
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

  // Initial sizes of the charts

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
      }}
    >
      <DashboardHeader
        anchorRef={anchorRef}
        editDashboard={editDashboard}
        handleClose={handleClose}
        handleToggle={handleToggle}
        open={open}
        renderableQueries={renderableQueries}
        dashboardData={dashboardData?.name}
      />

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 50, md: 50, sm: 16, xs: 10 }}
        rowHeight={50}
        autoSize
        isDraggable={edit}
        isResizable={edit}
        onLayoutChange={(currentLayout) => {
          console.log('Updated Layout:', currentLayout);
        }}
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
