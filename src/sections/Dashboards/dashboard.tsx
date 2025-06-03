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

import { LoadingScreen } from 'src/components/loading-screen';
import { useCustomDrawer } from 'src/components/custom-drawer/useCustomDrawer';

import Tabular from './components/outputs/tabular';
import useDashboardDetails from './hooks/usedashboard';
import { PieChart } from './components/outputs/pie-chart';
import { BarChart } from './components/outputs/bar-chart';
import EmptyDashboard from './components/empty-dashboard';
import SingeValue from './components/outputs/single-value';
import AddQueryWidget from './components/add-query-widget';
import Descriptive from './components/outputs/descriptive';
import DashboardHeader from './components/dashborad-header';
import { LineChart } from './components/outputs/line-chart';
import { useDatabaseId } from '../context/databaseid-context';
import { ScatterChart } from './components/outputs/scatter-chart';
import { StackedChart } from './components/outputs/stacked-chart';
import { DoughnutChart } from './components/outputs/doughnut-chart';
import AddWidgetDrawer from '../../components/custom-drawer/add-widget-drawer';

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
  const {
    edit,
    loading,
    renderableQueries,
    dashboardData,
    saveLayout,
    handleOpenSlider,
    handleCloseSlider,
    fetchDashboardInfo,
    layouts,
    editDashboard,
    refreshDashboardQueries,
    refreshLoading,
    layout,
    ResponsiveGridLayout,
    isSliderOpen,
  } = useDashboardDetails();
  const { MainContent } = useCustomDrawer();
  const { databaseId } = useDatabaseId();

  // Render chart
  const renderChart = (query: any, type?: string) => {
    if (!query.data) {
      return null;
    }

    // for descriptive
    if (query.outputType.toLowerCase() === 'descriptive') {
      return <Descriptive fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
    }
    // For singleValue
    if (query.outputType.toLowerCase() === 'singlevalue') {
      return <SingeValue fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
    }
    // For tabular data
    if (
      query.outputType.toLowerCase() === 'tabular' &&
      (!query.data.graph_type || typeof query.data !== 'object')
    ) {
      return <Tabular fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
    }
    // For chart data
    if (query.outputType && query.outputType) {
      switch (query.outputType.toLowerCase()) {
        case 'stacked chart':
          return <StackedChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
        case 'bar chart':
          return <BarChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
        case 'doughnut chart':
          return <DoughnutChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
        case 'pie chart':
          return <PieChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
        case 'line chart':
          return <LineChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
        case 'scatter chart':
          return <ScatterChart fetchDashboardInfo={fetchDashboardInfo} queryData={query} />;
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
    <div
      style={{
        paddingLeft: '20px',
        display: 'flex',
        backgroundColor: '#F4F6F8',
        position: 'relative',
        flexDirection: 'row',
        minHeight: '93vh',
        height: '100%',
      }}
    >
      <MainContent open={isSliderOpen}>
        <div
          style={{
            top: '100px',
            zIndex: '9',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <DashboardHeader
            refreshLoading={refreshLoading}
            handleOpenSlider={handleOpenSlider}
            dashboardName={dashboardData?.name}
            saveLayout={saveLayout}
            renderableQueries={renderableQueries}
            edit={edit}
            editDashboard={editDashboard}
            refreshDashboardQueries={refreshDashboardQueries}
          />
        </div>

        {renderableQueries?.length === 0 ? (
          <EmptyDashboard
            fetchDashboardInfo={fetchDashboardInfo}
            handleCloseSlider={handleCloseSlider}
            handleOpenSlider={handleOpenSlider}
            isSliderOpen={isSliderOpen}
          />
        ) : refreshLoading ? (
          <LoadingScreen />
        ) : (
          <ResponsiveGridLayout
            className="layouts"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 200 }}
            cols={{ lg: 50, md: 50, sm: 50, xs: 50, xxs: 50 }}
            rowHeight={50}
            autoSize
            isDraggable={edit}
            isResizable={edit}
            onLayoutChange={(currentLayout) => {
              layout.current = currentLayout;
            }}
          >
            {renderableQueries?.map((query: any, index: number) => (
              <div
                key={query.id.toString()}
                data-grid={
                  query.position.h !== 0
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
                  {query?.data?.graph_type?.toLowerCase()
                    ? renderChart(query, query.outputType)
                    : renderChart(query)}
                </Box>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}

        <AddWidgetDrawer open={isSliderOpen} onClose={handleCloseSlider}>
          <AddQueryWidget databaseId={databaseId} fetchDashboardInfo={fetchDashboardInfo} />
        </AddWidgetDrawer>
      </MainContent>
    </div>
  );
};

export default Dashboard;
