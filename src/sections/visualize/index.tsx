import { DashboardContent } from 'src/layouts/dashboard';

import VisulaizeHeader from './components/visualize-header';
import RecentDashboardList from '../home/components/recent-dashboard-list';

export default function VisulaizeView() {
  return (
    <DashboardContent maxWidth="xl">
      <VisulaizeHeader />
      <RecentDashboardList />
    </DashboardContent>
  );
}
