import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import RecentDashboardList from '../home/components/recent-dashboard-list';

export default function DashboardView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h2" fontWeight="medium">
        Dashboards
      </Typography>
      <RecentDashboardList />
    </DashboardContent>
  );
}
