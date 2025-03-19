import React, { useState } from 'react';

import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Tab, Grid, Stack, Typography } from '@mui/material';

import { primary } from 'src/theme/core';
import { DashboardContent } from 'src/layouts/dashboard';

import { KeyPoints } from './components/keypoints-home';
import PinnedDashboardList from './components/pinned-dashboard-list';
import RecentDashboardList from './components/recent-dashboard-list';
import { totalQueryCount, totalDatabaseCount, totalDashboardCount } from './api/actions';

// ----------------------------------------------------------------------

export default function HomeView() {
  const [activedatabases, setActiveDatabase] = useState<number>(0);
  const [totalDatabases, setTotalDatabase] = useState<number>(0);
  const [totalQueries, setTotalQueries] = useState<number>(0);
  const [totalDashboards, setTotalDashboards] = useState<number>(0);

  const getDatabaseCount = async () => {
    try {
      const dbCount = await totalDatabaseCount();
      setActiveDatabase(dbCount.activeCount || 0);
      setTotalDatabase(dbCount.totalCount || 0);
    } catch (error) {
      console.log(error);
    }
  };
  const getQueryCount = async () => {
    try {
      const queryCount = await totalQueryCount();
      setTotalQueries(queryCount.count || 0);
    } catch (error) {
      console.log(error);
    }
  };
  const getDashboardCount = async () => {
    try {
      const dashboardCount = await totalDashboardCount();
      setTotalDashboards(dashboardCount.count || 0);
    } catch (error) {
      console.log(error);
    }
  };
  getDatabaseCount();
  getQueryCount();
  getDashboardCount();

  const user = 'Application User';
  const data = [
    {
      total: totalDatabases,
      image: '/public/assets/images/home/total-databases-icon.svg',
      title: 'Total Databases',
    },
    {
      total: activedatabases,
      image: '/public/assets/images/home/active-databases-icon.svg',
      title: 'Active Databases',
    },
    {
      total: totalDashboards,
      image: '/public/assets/images/home/totoal-dashboards-icons.svg',
      title: 'Total Dashboards',
    },
    {
      total: totalQueries,
      image: '/public/assets/images/home/total-queries-icon.svg',
      title: 'Total Queries',
    },
  ];
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <DashboardContent maxWidth="xl">
      <Stack sx={{ height: '40vh' }}>
        <Typography variant="h3" fontWeight="bold" marginBottom="3%" color={primary.main}>
          Welcome, {user}
        </Typography>
        <Grid container direction="row">
          {data &&
            data.map((card) => (
              <Grid item xs={8} md={3}>
                <KeyPoints total={card.total} image={card.image} title={card.title} />
              </Grid>
            ))}
        </Grid>
      </Stack>
      <Stack sx={{ height: '1000px' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label=" Recent" value="1" />
            <Tab label="Pinned" value="2" />
          </TabList>

          <TabPanel value="1">
            <RecentDashboardList />
          </TabPanel>
          <TabPanel value="2">
            <PinnedDashboardList />
          </TabPanel>
        </TabContext>
      </Stack>
    </DashboardContent>
  );
}
