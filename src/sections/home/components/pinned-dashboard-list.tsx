import DashboardTableList from './dashboard-list';
import { pinnedDashboardsResponse } from '../api/actions';

export default function RecentDashboardList() {
  return <DashboardTableList fetchDataApi={() => pinnedDashboardsResponse(1, true)} />;
}
