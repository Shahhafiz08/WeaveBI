import DashboardTableList from './dashboard-list';
import { getDashboardResponse } from '../api/actions';

export default function PinnedDashboardList() {
  return <DashboardTableList fetchDataApi={getDashboardResponse} />;
}
