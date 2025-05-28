import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import OpenVisualize from 'src/sections/Dashboards/dashboard';

import { AuthGuard } from 'src/auth/guard';

import { paths } from '../paths';

// ----------------------------------------------------------------------

const Home = lazy(() => import('src/pages/home/index'));
const DbConnections = lazy(() => import('src/pages/database-connections/index'));
const Visualize = lazy(() => import('src/sections/visualize/index'));
const QueryBuilder = lazy(() => import('src/sections/queryBuilder/queryBuilder'));
const Settings = lazy(() => import('src/sections/settings/settings'));
const Learn = lazy(() => import('src/sections/Learn/learn'));

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
      { path: paths.dashboard.databaseConnections, element: <DbConnections /> },
      {
        path: paths.dashboard.visualize,
        element: <Visualize />,
      },
      {
        path: `${paths.dashboard.visualize}/:id`,
        element: <OpenVisualize />,
      },
      { path: paths.dashboard.queryBuilder, element: <QueryBuilder /> },
      { path: paths.dashboard.settings, element: <Settings /> },
      { path: paths.dashboard.learn, element: <Learn /> },
    ],
  },
];
