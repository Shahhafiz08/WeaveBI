import { Stack } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import VisulaizeHeader from './components/visualize-header';
import RecentDashboardList from '../home/components/recent-dashboard-list';

export default function VisulaizeView() {
  return (
    <DashboardContent maxWidth="xl" sx={{ background: '#F4F6F8' }}>
      <Stack gap={3}>
        <VisulaizeHeader />
        <RecentDashboardList />
      </Stack>
    </DashboardContent>
  );
}
