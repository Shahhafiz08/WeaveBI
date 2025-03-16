import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const Home = lazy(() => import('src/pages/home/index'));
const DbConnections = lazy(() => import('src/pages/database-connections/index'));
const Dashboard = lazy(() => import('src/sections/Dashboards/Dashboard'));
const QueryBuilder = lazy(() => import('src/sections/queryBuilder/queryBuilder'));
const Settings = lazy(() => import('src/sections/settings/settings'));
const Logut = lazy(() => import('src/sections/logut/logut'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'database-connection', element: <DbConnections /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'query-builder', element: <QueryBuilder /> },
      { path: 'settings', element: <Settings /> },
      { path: 'logut', element: <Logut /> },
    ],
  },
];
