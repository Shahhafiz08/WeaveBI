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

// import AddWegit from './components/add-widget';
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
  // const [, setHidden] = useState('flex');
  // const closeAddWidget = () => {
  //   setHidden('none');
  // };
  // const showAddWidget = () => {
  //   setHidden('flex');
  // };

  // Render chart
  const renderChart = (query: any, type?: string) => {
    if (!query.data) {
      return null;
    }
    console.log(query);

    // for descriptive
    if (query.outputType.toLowerCase() === 'descriptive') {
      return <Descriptive query={query} />;
    }
    // For singleValue
    if (query.outputType.toLowerCase() === 'singlevalue') {
      return <SingeValue query={query} />;
    }
    // For tabular data
    if (
      query.outputType.toLowerCase() === 'tabular' &&
      (!query.data.graph_type || typeof query.data !== 'object')
    ) {
      return (
        <Tabular
        query={query}
        />
      );
    }
    // For chart data
    if (query.data && query.data.graph_type) {
      switch (query.data.graph_type.toLowerCase()) {
        case 'bar':
          if (type?.toLowerCase() === 'stacked chart') {
            return <StackedChart query={query} />;
          }
          return <BarChart query={query} />;
        case 'doughnut':
          return <DoughnutChart query={query} />;
        case 'pie':
          return <PieChart query={query} />;
        case 'line':
          return <LineChart query={query} />;
        case 'scatter':
          return <ScatterChart query={query} />;
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
          top: '72px',
          zIndex: '9',
          paddingLeft: '40px',
          paddingRight: '20px',
        }}
      >
        <DashboardHeader
          // addWidget={showAddWidget}
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

      {renderableQueries?.length === 0 ? (
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
                {query?.data?.graph_type?.toLowerCase()
                  ? renderChart(query, query.outputType)
                  : renderChart(query)}
              </Box>
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </DashboardContent>
  );
};

export default Dashboard;
