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

import AddWegit from './components/add-wiget';
import EmptyDashboard from './empty-dashboard';
import Tabular from './components/outputs/tabular';
import useDashboardDetails from './hooks/usedashboard';
import { BarChart } from './components/outputs/bar-chart';
import { PieChart } from './components/outputs/pie-chart';
import SingeValue from './components/outputs/single-value';
import Descriptive from './components/outputs/descriptive';
import DashboardHeader from './components/dashborad-header';
import { LineChart } from './components/outputs/line-chart';
import { ScatterChart } from './components/outputs/scatter-chart';
import { StackedChart } from './components/outputs/stacked-chart';
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
    // chartColors,
    edit,
    loading,
    renderableQueries,
    dashboardData,
    saveLayout,
    layouts,
    editDashboard,
    refreshDashboardQueries,
    refreshLoading,
    layout,
    ResponsiveGridLayout,
  } = useDashboardDetails(id as string);

  // Render chart
  const renderChart = (query: any) => {
    if (!query.data) {
      return null;
    }

    // for descriptive
    const _heading = Array.isArray(query.data) ? Object.keys(query.data[0]) : [];
    if (query.outputType.toLowerCase() === 'descriptive') {
      return (
        <Descriptive
          incommingChartColor={query.colors?.chartColor}
          incommingTitleColor={query.colors?.titleColor}
          queryId={query.id}
          queryName={query.name}
          queryData={query.data}
        />
      );
    }
    // For singleValue
    if (query.outputType.toLowerCase() === 'singlevalue') {
      return (
        <SingeValue
          incommingChartColor={query.colors.chartColor}
          incommingTitleColor={query.colors.titleColor}
          queryId={query.id}
          qeryName={query.name}
          queryData={query.data}
        />
      );
    }
    // For tabular data
    if (
      query.outputType.toLowerCase() === 'tabular' &&
      (!query.data.graph_type || typeof query.data !== 'object')
    ) {
      return (
        <Tabular
          incommingChartColor={query.colors.chartColor}
          incommingTitleColor={query.colors.titleColor}
          queryId={query.id}
          title={query.title}
          queryGraphData={query.outputType}
          queryData={query.data}
          queryName={query.name}
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
                incommingChartColor={query.colors?.chartColor}
                incommingTitleColor={query.colors?.titleColor}
                labels={labels}
                chartData={datasets}
                queryId={query.id}
                title={title}
              />
            );
          }

          return (
            <BarChart
              incommingChartColor={query.colors.chartColor}
              incommingTitleColor={query.colors.titleColor}
              chartData={query.data.datasets}
              labels={labels}
              title={title}
              queryId={query.id}
            />
          );

        case 'doughnut':
          return (
            <DoughnutChart
              incommingChartColor={query.colors?.chartColor}
              incommingTitleColor={query.colors?.titleColor}
              queryId={query.id}
              title={title}
              labels={labels}
              values={values}
              datasetLabel={datasetLabel}
            />
          );

        case 'pie':
          return (
            <PieChart
              incommingChartColor={query.colors.chartColor}
              incommingTitleColor={query.colors.titleColor}
              labelss={labels}
              values={values}
              datasetLabel={datasetLabel}
              queryId={query.id}
              title={title}
            />
          );

        case 'line':
          return (
            <LineChart
              incommingChartColor={query.colors.chartColor}
              incommingTitleColor={query.colors.titleColor}
              title={title}
              queryId={query.id}
              labels={labels}
              values={values}
              datasetLabel={datasetLabel}
            />
          );

        case 'scatter':
          return (
            <ScatterChart
              incommingChartColor={query.colors.chartColor}
              incommingTitleColor={query.colors.titleColor}
              title={title}
              queryId={query.id}
              chartData={query.data?.datasets}
            />
          );

        default:
          return null;
      }
    }

    return null;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
        position: 'relative',
      }}
    >
      <div
        style={{
          // position: 'sticky',
          top: '72px',
          zIndex: '9',
          paddingLeft: '40px',
          paddingRight: '20px',
          // backgroundColor: 'rgba(255,255,255,0.8)',
          // backdropFilter: 'blur(5px)',
        }}
      >
        <DashboardHeader
          dashboardName={dashboardData?.name}
          id={id as unknown as any}
          saveLayout={saveLayout}
          renderableQueries={renderableQueries}
          edit={edit}
          editDashboard={editDashboard}
          refreshDashboardQueries={refreshDashboardQueries}
          refreshLoading={refreshLoading}
        />
      </div>
      {renderableQueries.length === 0 ? (
        <EmptyDashboard />
      ) : refreshLoading ? (
        <LoadingScreen />
      ) : (
        <ResponsiveGridLayout
          className="layouts"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 200 }}
          cols={{ lg: 50, md: 50, sm: 50, xs: 50 }}
          rowHeight={50}
          autoSize
          isDraggable={edit}
          isResizable={edit}
          onLayoutChange={(currentLayout) => {
            layout.current = currentLayout;
          }}
        >
          {renderableQueries.map((query: any, index: number) => (
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
      <div style={{ position: 'absolute', top: '10%', right: '0%', width: '100%', height: '40vh' }}>
        <AddWegit />
      </div>
    </DashboardContent>
  );
};

export default Dashboard;
