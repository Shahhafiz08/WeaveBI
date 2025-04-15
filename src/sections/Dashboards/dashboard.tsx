import { useCallback } from 'react';
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

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import Tabular from './components/outputs/tabular';
import { PieChart } from './components/outputs/pie-chart';
import { BarChart } from './components/outputs/bar-chart';
import Descriptive from './components/outputs/descriptive';
import SingeValue from './components/outputs/signle-value';
import { LineChart } from './components/outputs/line-chart';
import useDashboardDetails from './hooks/dashboard-details';
import DashboardHeader from './components/dashboard-header';
import { StackedChart } from './components/outputs/stacked-chart';
import { ScatterChart } from './components/outputs/scatter-chart';
import { DoughnutChart } from './components/outputs/doughnut-chart';

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
    edit,
    saveDashboard,
    loading,
    renderableQueries,
    layouts,
    editDashboard,
    refreshDashboardQueries,
    refreshLoading,

    ResponsiveGridLayout,
  } = useDashboardDetails({
    id: id as string,
  });

  const renderChart = useCallback(
    (query: any) => {
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
            title={query.title}
            queryGraphData={query.outputType}
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
    },
    [chartColors]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
      }}
    >
      <DashboardHeader
        id={id as unknown as any}
        edit={edit}
        editDashboard={editDashboard}
        saveDashboard={saveDashboard}
        refreshDashboardQueries={() => {
          refreshDashboardQueries();
        }}
        refreshLoading={refreshLoading}
      />
      {refreshLoading ? (
        <LoadingScreen />
      ) : (
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 50, md: 50, sm: 16, xs: 10 }}
          rowHeight={50}
          autoSize
          isDraggable={edit}
          isResizable={edit}
          onLayoutChange={(currentLayout) => {
            // console.log('Updated Layout:', currentLayout);
          }}
        >
          {renderableQueries?.map((query: any, index: number) => (
            <div
              key={query.id.toString()}
              data-grid={
                query.position
                  ? {
                      i: query.position.id,
                      w: query.position.z,
                      h: query.position.h,
                      y: query.position.y,
                      x: query.position.x,
                    }
                  : layouts.lg[index]
              }
            >
              <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                {renderChart(query)}
              </Box>
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </DashboardContent>
  );
};

export default Dashboard;
